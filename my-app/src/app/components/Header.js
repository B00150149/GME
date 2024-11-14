import React from 'react';
import '../styles/Header.css';
import Image from 'next/image';
import logo from '../images/logo.png';  // Adjust the path if necessary
import Link from 'next/link'; // Import Next.js Link component
import { FaHeart, FaSearch, FaEnvelope } from 'react-icons/fa'; // Import heart, search, and envelope icons

export default function Header() {
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
          <Link href="/login">Login</Link>
        </div>
      </header>

      {/* Secondary Navigation Bar */}
      <nav className="secondary-nav">
        <ul className="secondary-nav__list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/information">Information</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about-us">About Us</Link></li>
        </ul>
      </nav>
    </div>
  );
}
