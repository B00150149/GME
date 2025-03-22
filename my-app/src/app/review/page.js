'use client';

import React, { useState, useEffect } from 'react';
import '../styles/Review.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaStar } from 'react-icons/fa';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Fetch existing reviews
    fetch('/api/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
    
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim() || rating === 0) return;

    const reviewData = { text: newReview, rating, date: new Date().toISOString() };

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      setReviews([...reviews, reviewData]);
      setNewReview('');
      setRating(0);
    }
  };

  return (
    <div className="review-page">
      <Header />
      <div className="review-container">
        <h2>Customer Reviews</h2>
        
        {isLoggedIn ? (
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="rating-container">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                    />
                    <FaStar
                      className="star"
                      color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
              className="review-textarea"
            />
            <button type="submit" className="review-submit">Submit</button>
          </form>
        ) : (
          <p>Please log in to leave a review.</p>
        )}

        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-rating">
                  {[...Array(5)].map((star, i) => (
                    <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
                  ))}
                </div>
                <p>{review.text}</p>
                <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
