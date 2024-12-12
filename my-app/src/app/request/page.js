'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Header from '../components/Header'; // Adjust path if needed
import Footer from '../components/Footer'; // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Request() {
  const [requests, setRequests] = useState([]);

  // Fetch wishlist items from the API
  useEffect(() => {
    fetch('/api/getRequest')
        .then((res) => res.json())
        .then((data) => {
            setRequests(data);              
        })
        .catch((error) => console.error('Error fetching request:', error));
}, []);


  return (
    <>
      {/* Header */}
      <Header />

      <div className="container mt-5">
        <h2 className="text-center mb-4">Pending Requests</h2>
        
        {requests.length > 0 ? (
          <div className="list-group">
            {requests.map((request) => (
              <div className="list-group-item d-flex justify-content-between align-items-center" key={request._id}>
                <div>
                  <div><strong>Sender:</strong> {request.senderName}</div>
                  <div><strong>Email:</strong> {request.senderEmail}</div>
                  <div><strong>Item:</strong> {request.itemName}</div>
                  <div>
                    <strong>Status:</strong> 
                    <span className={`badge ${request.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>{request.status}</span>
                  </div>
                </div>
                
                <div>
                  <button className="btn btn-outline-danger me-2">Reject</button>
                  <button className="btn btn-outline-primary">Accept</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No requests found.</p>
        )}
      </div>


      {/* Footer */}
      <Footer />
    </>
  );
}
