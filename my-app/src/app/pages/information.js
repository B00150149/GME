// Information.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'next/navigation';
import '../styles/Information.css'; // Import the CSS from styles folder
import { articleimg1, articleimg2, articleimg3, learnimg, recycleimg, tipsimg } from '../images';

const Information = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    { src: articleimg1, caption: 'Simple Sustainable Swaps', buttonLink: 'https://www.downtoearth.org/articles/2019-10/14826/simple-sustainable-swaps' },
    { src: articleimg2, caption: '5 Ways to improve sustainability of electronics', buttonLink: 'https://www.electronicdesign.com/technologies/embedded/article/21279310/vtt-technical-research-centre-of-finland-5-ways-to-improve-the-sustainability-of-electronics' },
    { src: articleimg3, caption: '5 Ways to improve sustainability of electronics', buttonLink: 'https://www.electronicdesign.com/technologies/embedded/article/21279310/vtt-technical-research-centre-of-finland-5-ways-to-improve-the-sustainability-of-electronics' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/path-to-another-page');
  };

  return (
    <div className="grid-container">
      {/* Top Grid */}
      <div className="top">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`mySlides fade ${index === slideIndex ? 'active' : ''}`}
              style={{ display: index === slideIndex ? 'block' : 'none' }}
            >
              <div className="numbertext">{index + 1} / {slides.length}</div>
              <img src={slide.src} alt={`Slide ${index + 1}`} />
              <div className="text">{slide.caption}</div>
              <button className="slide-button" onClick={() => window.location.href = slide.buttonLink}>
                Click Me
              </button>
            </div>
          ))}
          <div style={{ textAlign: 'center' }}>
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === slideIndex ? 'active' : ''}`}
                onClick={() => setSlideIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Left Grid */}
      <div className="left">
        <h4>Learn</h4>
        <div className="image-container">
          <img src={learnimg} alt="Learn" />
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
          <img src={tipsimg} alt="Tips" />
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
          <img src={recycleimg} alt="Recycle" />
        </div>
        <p>
          Valuable insights on sustainable practices and eco-friendly upgrades.
        </p>
        <a href="https://electronicscrap.eu/" target="_blank" rel="noopener noreferrer">
          <button className="learn-button">Learn More</button>
        </a>
      </div>
    </div>
  );
};

export default Information;
