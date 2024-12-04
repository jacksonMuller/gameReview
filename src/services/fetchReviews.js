import { db } from '../firebaseConfig'; // Firestore initialization
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

/**
 * Save a new review for a specific game.
 * @param {string} gameId - The ID of the game.
 * @param {string} review - The review content.
 * @param {string} username - The username of the reviewer.
 */
export const addReview = async (gameId, review, username) => {
  try {
    const newReview = {
      gameId,
      review,
      username, // Add username to the review object
      timestamp: Timestamp.now(),
    };

    // Write to the nested "games/{gameId}/reviews" path
    const reviewsCollection = collection(db, `games/${gameId}/reviews`);
    await addDoc(reviewsCollection, newReview);
    console.log('Review added successfully with username');
  } catch (error) {
    console.error('Error adding review:', error);
  }
};

/**
 * Fetch all reviews for a specific game.
 * @param {string} gameId - The ID of the game.
 * @returns {Promise<Array>} - A promise that resolves to an array of reviews.
 */
export const getReviewsForGame = async (gameId) => {
  try {
    // Query from the nested "games/{gameId}/reviews" path
    const reviewsCollection = collection(db, `games/${gameId}/reviews`);
    const q = query(reviewsCollection);
    const querySnapshot = await getDocs(q);
    // Map the data to include the username and review content
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};
