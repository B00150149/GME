'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/newlisting.css'; // Import the CSS from styles folder
import usePointsStore from '../store/usePointsStore'; // Import the usePoints hook
import 'bootstrap/dist/css/bootstrap.min.css';

export default function newlisting() {
  const [isSubmitting, setIsSubmitting] = useState(false); 
   

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
      console.log('New Listing is successful!'); 
      alert(`New listing published! 🎉 You earned ${result.points} points.`);
      try {
        const categoryPointsMap = {
          Small: 20,
          Medium: 50,
          Large: 100,
        };
        const earnedPoints = categoryPointsMap[category] || 20;
        const email = localStorage.getItem('userEmail');

        await fetch(`/api/users/${email}/add-points`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points: earnedPoints }),
        });
        
        const { setPoints, addPointsHistory } = usePointsStore.getState();
        setPoints((prev) => prev + earnedPoints);
        addPointsHistory(`+${earnedPoints} points on ${new Date().toLocaleString()}`);

        const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
        localStorage.setItem('userPoints', currentPoints + earnedPoints);

        alert(`New listing published! 🎉 You earned ${earnedPoints} points.`);
        window.location = '/products';
      } catch (error) {
        console.error('Error awarding points:', error);
      }
    } else {
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
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
             
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

    