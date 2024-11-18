import * as React from 'react';
import Header from '../components/Header';  // Update path if needed
import Footer from '../components/Footer';  // Update path if needed

// Add Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the CSS file
import '../styles/Login.css';
import '../styles/Style.css';

export default function About() {

    return (
        <>
          
          <Header />
          <h1>About us</h1>
          <Footer/>
         </>
    );
}
