'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/Review.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReviewAllPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/review');
        const data = await response.json();
        setReviews(data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="review-page">
      <Header />
      <div className="review-container">
        <h2>All Reviews</h2>
        <div className="review-list">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review._id} className="review-item">
                  <h5>{review.userName}</h5>
                  <p>{review.reviewText}</p>
                  <div className="rating-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="star" style={{ color: star <= review.rating ? 'gold' : 'gray' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="review-date">{new Date(review.createdAt).toLocaleString()}</div>
                  {review.images?.length > 0 && (
                    <div className="review-images">
                      {review.images.map((image, index) => (
                        <img key={index} src={image} alt={`Review image ${index + 1}`} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
