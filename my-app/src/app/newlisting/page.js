'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/newlisting.css'; // Import the CSS from styles folder
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function newlisting() {
  const [rating, setRating] = useState(3); // Default rating

  return (

    <div className="newlisting">
      <Header /> 

    <div className="newlisting container my-5">
      <div className="card p-4">
        <h2 className="text-center">New Listing</h2>
        
        <form>
          <div className="form-group">
            <label htmlFor="itemName" className="form-label">Item Name:</label>
            <input type="text" className="form-control" id="itemName" />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea className="form-control" id="description" rows="3"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category:</label>
            <select className="form-select" id="location">
              <option value="">Select Category</option>
              <option value="Location1">Small</option>
              <option value="Location2">Medium</option>
              <option value="Location3">Large</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="images" className="form-label">Images:</label>
            <input type="file" className="form-control" id="images" multiple />
          </div>

          <div className="form-group">
            <label htmlFor="swapDetails" className="form-label">Swap Details:</label>
            <textarea className="form-control" id="swapDetails" rows="3"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">Location:</label>
            <select className="form-select" id="location">
              <option value="">Select Location</option>
              <option value="Location1">Dublin 1</option>
              <option value="Location2">Dublin 2</option>
              <option value="Location3">Dublin 3</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Rating:</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  onClick={() => setRating(star)} 
                  style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Publish</button>
        </form>
      </div>
    </div>

    <Footer />
  </div> 
  );
}
