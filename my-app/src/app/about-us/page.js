import * as React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer';  
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import '../styles/Style.css';

export default function About() {

    return (
        <>
          
          <Header />
          <h1>About</h1>
          <h2>Mission statement here*</h2>
          <Footer/>
         </>
    );
}
