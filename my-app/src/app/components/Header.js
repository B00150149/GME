'use client' 

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/Header.css';
import logo from '../images/logo2.png';  // Adjust the path if necessary
import { FaHeart, FaSearch, FaEnvelope, FaUser, FaComment, FaBars, FaTimes } from 'react-icons/fa'; // Added FaBars and FaTimes for hamburger menu


export default function Header({ onSearch = () => {} }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const [requestCount, setRequestCount] = useState(0);



  useEffect(() => {
    const fetchRequestCount = async () => {
      try {
        const res = await fetch('/api/getRequest');
        const data = await res.json();
        setRequestCount(data.length);  // Count of accepted requests
      } catch (error) {
        console.error("Failed to fetch request count:", error);
      }
    };
  
    if (isLoggedIn) {
      fetchRequestCount();
    }
  }, [isLoggedIn]);


  useEffect(() => {
    // Fetch the session email
    const fetchUserData = async () => {
      const response = await fetch('/api/getData');
      const data = await response.json();

      if (data.email && data.fullName) {
        setUserData(data);
        console.log('Header get Data call successful');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    setUserData(null);
    setIsLoggedIn(false);
    fetch('/api/clearWishlist');
    fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Logout failed');
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        router.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) onSearch(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchTerm.trim() !== '') {
      router.push(`/products?searchQuery=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <Link href="/">
            <Image src={logo} alt="Logo" width={menuOpen ? 50 : 80} height={menuOpen ? 50 : 80} className="logo-image" />
          </Link>
          <h1>GreenerMe</h1>
        </div>

        <div className="header__search">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch onClick={handleSearchButtonClick} style={{ cursor: 'pointer', marginLeft: '8px' }} />
        </div>

        <button className="hamburger-button" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`header__nav ${menuOpen ? 'open' : ''}`}>

        <Link
          href="/request" className="request-link"
          onClick={() => { setRequestCount(0);  setMenuOpen(false);  }} //  clear the badge in memory & close the hamburger menu
          style={{ position: 'relative' }}>
          <FaEnvelope className="request-icon" />
          {requestCount > 0 && ( <span className="notification-badge"> {requestCount} </span> )}
        </Link>


          <Link href="/wishlist" className="wishlist-link" onClick={() => setMenuOpen(false)}>
            <FaHeart className="wishlist-icon" />
          </Link>
          
          {!isLoggedIn && <Link href="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>}

          {isLoggedIn && (
            <Link href="/messages" className="messenger-link" onClick={() => setMenuOpen(false)}>
              <FaComment className="messenger-icon" />
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer', padding: 0 }}
            >
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}

          {isLoggedIn && (
            <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
              <Link
                href={`/profile2?email=${userData?.email}`}
                className="user-link"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <FaUser className="user-icon" />
              </Link>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link href="/profile2" className="dropdown-item" onClick={() => setMenuOpen(false)}>New Listing</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="dropdown-item">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <nav className="secondary-nav">
        <ul className="secondary-nav__list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/information">Information</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about-us">About Us</Link></li>
        </ul>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isLoggedIn && userData ? (<div>Welcome {userData.fullName}!</div>) : (<div></div>)}
      </div>
    </div>
  );
}