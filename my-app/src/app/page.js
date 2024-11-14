'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';  // Import Link from next/link
import './styles/Homepage.css'; // Import the CSS file
import Header from './components/Header';  // Update path if needed
import Footer from './components/Footer';  // Update path if needed
import homepage from './images/homepagee.jpg';


import './styles/Style.css';

export default function Homepage() {
  return (
    <>
      <Header />
      
      <div className="homepage-container">
        <div className="homepage-content">
          {/* Left section with big text */}
          <div className="homepage-left">
            <h1 className="title">Greener Me</h1>
            <div className="image-container">
              <Image 
                src={homepage} alt="Recycle" />
            </div>
          </div>

          {/* Right section with buttons */}
          <div className="homepage-right">
            <Link href="/signup">
              <button className="button">Join the Community</button>
            </Link>
            <Link href="/information">
              <button className="button">Explore Eco-Friendly Upgrades</button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
