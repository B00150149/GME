'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/newlisting.css'; // Import the CSS from styles folder
import usePointsStore from '../store/usePointsStore'; // Import the usePoints hook
import 'bootstrap/dist/css/bootstrap.min.css';

export default function newlisting() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setPoints,addPointsHistory } = usePointsStore()     

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = new FormData(event.currentTarget);
    const itemName = data.get('itemName');
    const description = data.get('description');
    const category = data.get('category');
    const swapDetails = data.get('swapDetails');
    const images = data.getAll('images');

    // Upload images to Cloudinary
    const uploadedImageUrls = [];
    for (const imageFile of images) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error('Cloudinary upload failed');
        setIsSubmitting(false);
        return;
      }

      const json = await res.json();
      uploadedImageUrls.push(json.secure_url);
    }

    // Prepare payload
    const payload = {
      itemName,
      description,
      category,
      swapDetails,
      images: uploadedImageUrls,
    };

    // Send POST request to backend API
    const response = await fetch('/api/putnewListing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.data === 'inserted') {
      console.log('New Listing is successful!'); // Award points to user after the listing is successfully inserted
     
      try {
        const earnedPoints = 20; // Award 20 points for new listing
  
        // Make API call to update points in the backend
        const email = localStorage.getItem('userEmail'); // Assuming you store the user's email in localStorage
        await fetch(`/api/users/${email}/add-points`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points: earnedPoints }), // Add points
        });
  
        console.log('Awarded 20 points for new listing!');
  
        // Update Zustand store with the awarded points
        const { setPoints } = usePointsStore.getState(); // Get Zustand store's `setPoints` function
        setPoints((prevPoints) => prevPoints + earnedPoints); // Increment current points by 20
        addPointsHistory(`+${earnedPoints} points on ${new Date().toLocaleString()}`);

        
        // Store points in localStorage
        const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
        localStorage.setItem('userPoints', currentPoints + earnedPoints);

      window.location = '/products';
    } 
    catch(error) {
        console.error('Error awarding points:', error);
      }
      console.log('Listing creation failed');
    }
      setIsSubmitting(false);
      return;
    }

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="text-center">Create a New Listing</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">Item Name</label>
            <input type="text" className="form-control" id="itemName" name="itemName" required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows="3" required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select className="form-select" id="category" name="category" required>
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
             
              </select>
          </div>
          <div className="mb-3">
            <label htmlFor="swapDetails" className="form-label">Swap Details</label>
            <textarea className="form-control" id="swapDetails" name="swapDetails" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Upload Images</label>
            <input type="file" className="form-control" id="images" name="images" accept=".jpg, .jpeg, .png, .gif" multiple required />
          </div>
          {isSubmitting ? (
            <button type="submit" className="btn btn-primary disabled">Submitting...</button>
          ) : (
            <button type="submit" className="btn btn-primary">Create Listing</button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
    