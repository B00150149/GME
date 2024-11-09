import React from 'react';
import '../styles/Footer.css';
import Image from 'next/image'
import logo from '../images/logo.png';  // Adjust the path if necessary
import Link from 'next/link'; // Import Next.js Link component


export default function Footer (){
    return (
        <footer className="footer">

            {/* Logo Section */}
            <div className="footer__logo"> <Image src={logo} alt="Logo" width={40} height={40} /></div>

                <div className="footer-links">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-and-conditions">Terms and Conditions</a>
                </div>

                {/* Navigation Links */}
                <div className="footer-social">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                </div>
                
          
        </footer>
    );
};


