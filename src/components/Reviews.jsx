import { useState, useEffect } from 'react';
import { addReview, getReviewsForGame } from '../services/fetchReviews';
import { auth } from '../firebaseConfig'; // Import Firebase auth to get the username

export const Reviews = ({ gameId }) => {
  const [reviews, setReviews] = useState([]); // List of reviews
  const [newReview, setNewReview] = useState(''); // New review input
  const [username, setUsername] = useState(''); // Username of the logged-in user

  // Fetch reviews when the component loads or `gameId` changes
  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviewsForGame(gameId);
      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, [gameId]);

  // Fetch the username of the authenticated user
  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName || 'Anonymous'); // Use displayName or fallback to 'Anonymous'
    }
  }, []);

  // Handler for adding a review
  const handleAddReview = async () => {
    if (newReview.trim() && username) {
      await addReview(gameId, newReview.trim(), username); // Pass username to addReview
      setReviews([
        ...reviews,
        {
          gameId,
          review: newReview.trim(),
          username, // Include username in the displayed reviews
          timestamp: new Date(),
        },
      ]); // Update UI
      setNewReview(''); // Clear input
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-inner">
      {/* Dark Grey Header */}
      <h3 className="text-xl font-bold mb-4 text-gray-800">Reviews</h3>

      {/* Display Reviews */}
      <ul className="mb-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <li key={index} className="mb-2 text-gray-700">
              <strong className="block">{review.username}:</strong>
              {review.review} {/* Display the review content */}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to add one!</p>
        )}
      </ul>

      {/* Add Review Form */}
      <div className="flex">
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="flex-grow p-2 border rounded-l text-gray-800" // Added `text-gray-800`
          placeholder="Write a review..."
        />
        <button
          onClick={handleAddReview}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Add
        </button>
      </div>
    </div>
  );
};
