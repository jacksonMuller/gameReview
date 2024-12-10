import { useState, useEffect } from 'react';
import { addReview, getReviewsForGame } from '../services/fetchReviews';
import { auth } from '../firebaseConfig';
import ReactStars from 'react-rating-stars-component';

export const Reviews = ({ gameId, gameName, coverUrl }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviewsForGame(gameId);
      setReviews(fetchedReviews);
    };
    fetchReviews();
  }, [gameId]);

  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName || 'Anonymous');
    }
  }, []);

  const handleAddReview = async () => {
    if (newReview.trim() && username && rating > 0) {
      await addReview(gameId, newReview.trim(), username, rating, gameName, coverUrl);
      setReviews([
        ...reviews,
        {
          gameId,
          review: newReview.trim(),
          username,
          rating,
          timestamp: new Date(),
        },
      ]);
      setNewReview('');
      setRating(0);
    } else {
      if (!username) {
        alert('Please sign in to add a review.');
      } else {
        alert('Please provide both a rating and a review.');
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-inner">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Reviews</h3>
      <ul className="mb-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <li key={index} className="mb-4 text-gray-700 border-b pb-2">
              <div className="flex items-center justify-between">
                <strong>{review.username}</strong>
                {review.rating && (
                  <ReactStars
                    count={5}
                    value={review.rating / 2}
                    size={20}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                )}
              </div>
              <p>{review.review}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to add one!</p>
        )}
      </ul>

      <div className="flex flex-col">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="p-2 border rounded text-gray-800 mb-2"
          placeholder="Write a review..."
          rows={3}
        />
        <div className="flex items-center mb-2">
          <span className="mr-2 text-gray-800">Your Rating:</span>
          <ReactStars
            count={10}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={window.innerWidth < 768 ? 30 : 40}
            isHalf={true}
            activeColor="#ffd700"
          />
        </div>
        <button
          onClick={handleAddReview}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};
