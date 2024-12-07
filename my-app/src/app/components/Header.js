//import React from 'react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import Image from 'next/image';
import '../styles/Header.css';
import logo from '../images/logo.png';  // Adjust the path if necessary
import { FaHeart, FaSearch, FaEnvelope } from 'react-icons/fa'; // Import heart, search, and envelope icons


export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch the session email
    const fetchUserData = async () => {
      const response = await fetch('/api/getData');
            const data = await response.json();

            if (data.email && data.fullName) {
                setUserData(data);
                console.log('Header get Data call successful');
            } else {
                //console.error('No user data found');
            }
    };

    fetchUserData();
  }, []);

  useEffect(() => {  
    // Check if the user is logged in by checking localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);


  function handleLogout() {
    // Logout logic
     localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');//
     setUserData(null);
     setIsLoggedIn(false);
     console.log('User logged out');

     //empty session wishlist
     fetch('/api/clearWishlist');

    //  fetch('http://localhost:3000/api/logout') // Call API to destroy session
    //  .then((response) => response.json())
    //  .then((data) => {  
    //    console.log(data.message); // 'Logged out successfully'
    //  });    

    // Call API to destroy session
      fetch('/api/logout', {
        method: 'POST', // Use POST method as defined in your API
        headers: {
          'Content-Type': 'application/json', // Specify JSON if your API expects it
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Logout failed');
          }
         return response.json();
        })
        .then((data) => {
          console.log(data.message); // 'Logged out successfully'
        })
        
        window.location.reload(); // Optionally reload the page
        
  }  //end of handleLogout()


  return (
    <div>
      <header className="header">

        {/* Logo Section */}
        <div className="header__logo">
          <Image src={logo} alt="Logo" width={40} height={40}/> GreenerMe
        </div>

        {/* Search Bar Section */}
        <div className="header__search">
          <input className="search-input" type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>

        {/* Navigation Links */}
        <div className="header__nav">
          <Link href="/request" className="request-link">
            <FaEnvelope className="request-icon" />
          </Link>
          <Link href="/wishlist" className="wishlist-link">
            <FaHeart className="wishlist-icon" />
          </Link>
          <Link href="/signup">Signup</Link>
          {/* <Link href="/login">Login</Link> */}
          {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#0070f3',
              cursor: 'pointer',
              padding: '0',
            }}
          >
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}

          
        </div>
      </header>

      {/* Secondary Navigation Bar */}
      <nav className="secondary-nav">
        <ul className="secondary-nav__list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/information">Information</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/aboutUs">About Us</Link></li>
        </ul>
      </nav>

      {/* <div>    {isLoggedIn && userData ?(<div>Welcome { userData.fullName} !</div>):(<div></div>)} </div> */}

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>  
        {isLoggedIn && userData ? (<div>Welcome {userData.fullName}!</div>) : (<div></div>)}
      </div>

    </div>//end div
    
  );
}
