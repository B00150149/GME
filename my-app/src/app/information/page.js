'use client'

import React, { useState, useEffect } from 'react';;
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Information.css'; // Import the CSS from styles folder
import Link from 'next/link';
import Image from 'next/image';
import { articleimg1, articleimg2, articleimg3, learnimg, recycleimg, tipsimg } from '../images';

export default function Information (){
 
  return (
    <div className="Information">
      <Header /> 
    <div className="grid-container">
      {/* Top Grid */}

      <div className="top">
        {/* Bootstrap Carousel */}
        <div id="articleCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {/* Carousel Item 1 */}
              <div className="carousel-item active">
                <Link href="https://www.example.com/article1" target="_blank" rel="noopener noreferrer">
                  <Image src={articleimg1} className="d-block w-100" alt="Article 1" />
                </Link>
              </div>
              {/* Carousel Item 2 */}
              <div className="carousel-item">
                <Link href="https://www.example.com/article2" target="_blank" rel="noopener noreferrer">
                  <Image src={articleimg2} className="d-block w-100" alt="Article 2" />
                </Link>
              </div>
              {/* Carousel Item 3 */}
              <div className="carousel-item">
                <Link href="https://www.example.com/article3" target="_blank" rel="noopener noreferrer">
                  <Image src={articleimg3} className="d-block w-100" alt="Article 3" />
                </Link>
              </div>
            </div>
            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#articleCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#articleCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
      </div>

      {/* Left Grid */}
      <div className="left">
        <h4>Learn</h4>
        <div className="image-container">
          <Image src={learnimg} alt="Learn" />
        </div>
        <p>
          Brief description about what you can learn. This section provides valuable insights on sustainable practices and eco-friendly upgrades.
        </p>
        <a href="https://www.investopedia.com/terms/s/sustainability.asp" target="_blank" rel="noopener noreferrer">
          <button className="learn-button">Learn More</button>
        </a>
      </div>

      {/* Middle Grid */}
      <div className="main">
        <h4>Recycling Tips</h4>
        <div className="image-container">
          <Image src={tipsimg} alt="Tips" />
        </div>
        <p>
          Valuable insights and information on sustainable practices and eco-friendly upgrades.
        </p>
        <a href="https://www.keygreen.ie/news/post/your-guide-to-electronic-waste-recycling#:~:text=You%20should%20recycle%20your%20old,disposed%20of%20safely%20and%20sustainably." target="_blank" rel="noopener noreferrer">
          <button className="learn-button">Learn More</button>
        </a>
      </div>

      {/* Right Grid */}
      <div className="right">
        <h4>Recycling Locations</h4>
        <div className="image-container">
          <Image src={recycleimg} alt="Recycle" />
        </div>
        <p>
          Valuable insights on sustainable practices and eco-friendly upgrades.
        </p>
        <a href="https://electronicscrap.eu/" target="_blank" rel="noopener noreferrer">
          <button className="learn-button">Learn More</button>
        </a>
      </div>
    </div>
    
    <Footer />
  </div> 
  );
};


