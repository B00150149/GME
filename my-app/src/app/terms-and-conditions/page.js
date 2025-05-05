'use client';
import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer';  
import './terms-and-conditions.css';  

export default function TermsAndConditions() {
  return (
    <div className="terms-container">
      <Header />
      <main className="terms-content">
        <h1>Terms and Conditions</h1>
        <p className="effective-date">Effective Date: April 1, 2024</p>
        <p>Welcome to GreenerMe! By accessing or using the GreenerMe mobile application (“App”) or website, you agree to be bound by these Terms and Conditions (“Terms”). Please read them carefully.</p>
        <h2>1. About GreenerMe</h2>
        <p>GreenerMe is a free-to-use, peer-to-peer platform that enables individuals in the Republic of Ireland to swap second-hand goods in the spirit of sustainability and the circular economy. Users communicate through our in-app messaging system to agree upon and coordinate item swaps.</p>
        <h2>2. Eligibility</h2>
        <p>You must be at least 18 years old and a resident of the Republic of Ireland to use GreenerMe. By registering, you confirm that all information provided is accurate and that you will keep it updated.</p>
        <h2>3. Permitted Items</h2>
        <p>GreenerMe is intended solely for non-commercial swapping of second-hand goods. The following items are prohibited:</p>
        <ul>
          <li>Perishable goods (e.g., food, drink, flowers)</li>
          <li>Hazardous materials</li>
          <li>Illegal items or stolen goods</li>
          <li>Items that infringe on any third-party rights (e.g., counterfeit products)</li>
        </ul>
        <p>GreenerMe reserves the right to remove any listings that breach these guidelines.</p>
        <h2>4. Peer-to-Peer Responsibility</h2>
        <p>All swaps are carried out entirely at the users' own risk. GreenerMe is not a party to any transaction, nor does it verify the condition, legality, or authenticity of items listed.</p>
        <p>Users are solely responsible for:</p>
        <ul>
          <li>Agreeing to the terms of each swap through the messaging system</li>
          <li>Meeting in safe, agreed-upon public locations</li>
          <li>Ensuring items are accurately described and in reasonable condition</li>
        </ul>
        <p>We recommend using caution and good judgment during all interactions.</p>
        <h2>5. Reviews and Ratings</h2>
        <p>To promote trust and accountability, users can rate and review each other after a swap. Reviews must be honest, fair, and not include defamatory, abusive, or discriminatory content. GreenerMe reserves the right to remove reviews that violate these standards.</p>
        <h2>6. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the App for commercial purposes or advertising</li>
          <li>Post false, misleading, or harmful content</li>
          <li>Impersonate another person or misrepresent your identity</li>
          <li>Harass, threaten, or abuse other users</li>
        </ul>
        <p>Violations may result in account suspension or removal at our sole discretion.</p>
        <h2>7. Intellectual Property</h2>
        <p>All content and features of the GreenerMe App, including name, logo, and branding, are the intellectual property of GreenerMe and may not be copied or used without permission.</p>
        <h2>8. Data Protection</h2>
        <p>By using GreenerMe, you consent to the collection and use of personal data as described in our <a href="/privacy-policy" className="privacy-link">Privacy Policy</a>. Personal data is only used to operate the App, provide support, and improve user experience. We will never sell your data.</p>
        <h2>9. Limitation of Liability</h2>
        <p>GreenerMe provides the platform “as is” and makes no warranties or guarantees regarding the functionality, security, or reliability of the App or the quality of items exchanged.</p>
        <p>To the maximum extent permitted by law, GreenerMe shall not be liable for any loss, damage, or dispute arising from user transactions or interactions.</p>
        <h2>10. Changes to Terms</h2>
        <p>We may update these Terms from time to time. Continued use of the App after changes are posted constitutes your acceptance of the revised Terms.</p>
        <h2>11. Contact Us</h2>
        <p>If you have any questions or concerns about these Terms, please contact us.</p>
      </main>
      <Footer />
    </div>
  );
}
