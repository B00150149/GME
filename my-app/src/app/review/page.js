'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Review.css'; // Import the CSS from styles folder
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReviewPage() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [reviews, setReviews] = useState([]); // Initialize reviews as an empty array

  // Fetch reviews when component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/review');
        const data = await response.json();
        setReviews(data.reviews || []); // Ensure reviews is always an array
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  // Handle file input and preview image
  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages(files);

    // Preview first image if selected
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(''); // Reset error message before submission

    const formData = new FormData();
    formData.append('reviewText', reviewText);
    formData.append('rating', rating);
    // Append all images to the FormData object
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        body: formData,
      });

      // Check if the response status is OK
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setErrorMessage('Failed to submit review. Please try again later.');
        setIsSubmitting(false);
        return;
      }

      // Try to parse the response JSON
      const data = await response.json();
      console.log('Review submitted successfully:', data);

      // Reset form state after successful submission
      setReviewText('');
      setRating(0);
      setImages([]);
      setPreview(null);

      // Fetch updated reviews after successful submission
      const updatedResponse = await fetch('/api/review');
      const updatedData = await updatedResponse.json();
      setReviews(updatedData.reviews || []); // Ensure reviews is always an array
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage('An error occurred while submitting the review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-page">
      <Header />

      <div className="review-container">
        <h2>Submit a Review</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="review-form">
          <textarea
            className="review-textarea"
            id="reviewText"
            name="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>

          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className="star"
                style={{
                  color: star <= rating ? 'gold' : 'gray',
                }}
              >
                ★
              </span>
            ))}
          </div>

          <div className="image-upload-container">
            <label htmlFor="images" className="image-upload-label">
              Choose images (optional)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Image preview" />
              </div>
            )}
          </div>

          <button type="submit" className="review-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>

        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

        {/* Render Reviews */}
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
                      <span
                        key={star}
                        className="star"
                        style={{
                          color: star <= review.rating ? 'gold' : 'gray',
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="review-date">{new Date(review.createdAt).toLocaleString()}</div>
                  {review.images && review.images.length > 0 && (
                    <div className="review-images">
                      {review.images.map((image, index) => (
                        <img key={index} src={image} alt={`review image ${index + 1}`} />
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
