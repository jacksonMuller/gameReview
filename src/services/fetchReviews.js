import { db } from '../firebaseConfig'; 
import { collection, getDocs, query, doc, addDoc, runTransaction, Timestamp, orderBy, limit } from 'firebase/firestore';

export const addReview = async (gameId, review, username, rating, gameName, coverUrl) => {
  try {
    const gameIdStr = String(gameId);
    const gameDocRef = doc(db, 'games', gameIdStr);

    const reviewsCollection = collection(db, `games/${gameIdStr}/reviews`);
    await addDoc(reviewsCollection, {
      gameId: gameIdStr,
      review,
      username,
      rating: Number(rating),
      timestamp: Timestamp.now(),
    });

    await runTransaction(db, async (transaction) => {
      const gameDoc = await transaction.get(gameDocRef);

      let newCount = 1;
      let newTotal = rating;
      let newName = gameName || 'Unknown Game';
      let newCoverUrl = coverUrl || '';

      if (gameDoc.exists()) {
        const data = gameDoc.data();
        newCount = (data.reviewCount || 0) + 1;
        newTotal = (data.totalRating || 0) + rating;
        
        newName = data.name || newName;
        newCoverUrl = data.coverUrl || newCoverUrl;
      }

      const newAverage = newTotal / newCount;

      transaction.set(gameDocRef, {
        name: newName,
        coverUrl: newCoverUrl,
        reviewCount: newCount,
        totalRating: newTotal,
        averageRating: newAverage
      }, { merge: true });
    });

    console.log('Review and game details added/updated successfully');
  } catch (error) {
    console.error('Error adding review and game details:', error);
  }
};


export const getReviewsForGame = async (gameId) => {
  try {
    const gameIdStr = String(gameId);
    const reviewsCollection = collection(db, `games/${gameIdStr}/reviews`);
    const q = query(reviewsCollection);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const getTopGames = async () => {
  try {
    const gamesCollection = collection(db, 'games');
    const q = query(gamesCollection, orderBy('averageRating', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      gameId: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching top games:', error);
    return [];
  }
};
