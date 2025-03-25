'use client';

import React, { useState } from 'react';
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

      <div className="review-form container my-5">
        <div className="card p-4">
          <h2 className="text-center">Submit a Review</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="reviewText" className="form-label">Review Text:</label>
              <textarea
                className="form-control"
                id="reviewText"
                name="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Rating:</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: 'pointer',
                      color: star <= rating ? 'gold' : 'gray',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="images" className="form-label">Images (optional):</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
              />
              {preview && (
                <div className="image-preview mt-3">
                  <img src={preview} alt="Image preview" className="img-fluid" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          {/* Show error message if submission fails */}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
}
