'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import Next.js router
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/newlisting.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import usePointsStore from '../store/pointsStore';

export default function NewListing() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addPoints } = usePointsStore(); // Get function to update points
  const router = useRouter(); // Next.js router for navigation

  const handleSubmit = async (event) => {
    console.log("Handling submit...");
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    console.log("Uploading item:", {
      itemName: formData.get('itemName'),
      description: formData.get('description'),
      category: formData.get('category'),
      swapDetails: formData.get('swapDetails'),
      images: formData.getAll('images')
    });

    try {
      const res = await fetch('/api/uploadItem', {
        method: 'POST',
        body: formData, // Send FormData directly
      });

      const data = await res.json();

      if (data.success) {
        console.log("New listing successful!");
        console.log("Points awarded:", data.points);
        addPoints(data.points); // Update global points state  
        router.push('/products'); // Redirect to products page
      } else {
        console.log("Submission failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newlisting">
      <Header /> 
      <div className="newlisting container my-5">
        <div className="card p-4">
          <h2 className="text-center">New Listing</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="itemName" className="form-label">Item Name:</label>
              <input type="text" className="form-control" id="itemName" name="itemName" required/>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea className="form-control" id="description" name="description" rows="3" required></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">Category:</label>
              <select className="form-select" id="category" name="category" required>
                <option value="">Select Category</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="images" className="form-label">Images:</label>
              <input type="file" className="form-control" id="images" name="images" multiple required/>
            </div>

            <div className="form-group">
              <label htmlFor="swapDetails" className="form-label">Swap Details:</label>
              <textarea className="form-control" id="swapDetails" name="swapDetails" rows="3" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div> 
  );
}
