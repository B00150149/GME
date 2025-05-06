'use client';

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from '../components/Header';
import Footer from '../components/Footer';
import PointsTracker from './PointsTracker';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/swap.css';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [uploadedProducts, setUploadedProducts] = useState([]);

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const res = await fetch(`/api/users/${email}`);
          const data = await res.json();
          setUserData(data);
          setTotalPoints(data.points || 0);
          setPointsHistory(data.pointsHistory || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      const fetchUploadedProducts = async () => {
        try {
          console.log("Fetching uploaded products for email:", email);
          const res = await fetch(`/api/products/user/${email}`);
          const data = await res.json();
          console.log("Uploaded products data:", data);
          setUploadedProducts(data);
        } catch (error) {
          console.error("Error fetching uploaded products:", error);
        }
      };

    if (email) {
      fetchUserData();
      fetchUploadedProducts();
    }
  }, [email]);

  if (!userData) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <main className="container my-5" style={{ flex: '1 0 auto' }}>
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-gray-600">Name: {userData.fullName}</p>
            <p className="text-gray-600">Email: {userData.email}</p>
            <p className="text-gray-600">Points: {totalPoints}</p>

            <PointsTracker setTotalPoints={setTotalPoints} setPointsHistory={setPointsHistory} />

            <h3 className="text-xl font-semibold mt-4">Points Transaction History:</h3>
            <ul>
              {pointsHistory.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>

            <div className="mb-4">
              <a
                href="/newlisting"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#064e03',
                  color: 'white',
                  fontWeight: '600',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                Upload Product
              </a>
            </div>
            <h2 className="text-xl font-semibold mt-4">Uploaded Items</h2>
            {uploadedProducts && uploadedProducts.length > 0 ? (
              <ul>
                {uploadedProducts.map((item, index) => (
                  <li key={item._id || index} className="border p-2 rounded-lg">
                    {item.itemName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No uploaded items yet.</p>
            )}

            <h2 className="text-xl font-semibold mt-4">Swapped Items</h2>
                {userData.swappedItems && userData.swappedItems.length > 0 ? (
                  <ul>
                    {userData.swappedItems.map((item, index) => (
                      <li key={item._id || index} className="border p-2 rounded-lg flex justify-between items-center">
                        <span>{item.itemName} swapped with {item.swapItemName}</span>
                        <a
                        href="/review"
                        className="review-button px-3 py-1"
                        style={{
                        backgroundColor: '#16a34a',
                        color: 'white',
                        borderRadius: '0.375rem',
                        padding: '0.25rem 0.75rem',
                        marginLeft: '2rem',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                        }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#15803d'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#16a34a'}
                    >
                      Review
                    </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No swapped items yet.</p>
                )}
          </div>
        </main>
        <Footer style={{ flexShrink: 0 }} />
      </div>
    </>
  );
};

// This wraps ProfilePage in a Suspense boundary
const ProfileWrapper = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfilePage />
    </Suspense>
  );
};

export default ProfileWrapper;





