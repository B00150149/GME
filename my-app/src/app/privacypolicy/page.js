'use client';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './privacy-policy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <Header />
      <main className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="effective-date">Effective Date: April 1, 2024</p>
        <p>GreenerMe ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use the GreenerMe mobile application ("App") or website.</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, and location when you register.</li>
          <li><strong>Communication Data:</strong> Messages you send and receive through our in-app messaging system.</li>
          <li><strong>Usage Data:</strong> App usage statistics, device type, and other technical data to improve functionality.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>Your data is used solely to:</p>
        <ul>
          <li>Operate and maintain the App</li>
          <li>Enable peer-to-peer item swapping and communication</li>
          <li>Provide user support and respond to inquiries</li>
          <li>Monitor app performance and fix bugs</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We do not sell or rent your personal data. We only share information when necessary to:</p>
        <ul>
          <li>Comply with legal obligations</li>
          <li>Protect the rights and safety of users</li>
          <li>Support essential service providers (e.g., hosting or analytics)</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We implement reasonable technical and organizational measures to protect your data. However, no system is 100% secure. Please use caution when sharing information.</p>

        <h2>5. Your Rights</h2>
        <p>As a user in the Republic of Ireland, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent where applicable</li>
        </ul>
        <p>To exercise these rights, contact us at the email provided below.</p>

        <h2>6. Data Retention</h2>
        <p>We retain your information only as long as necessary to fulfill the purposes outlined in this Policy, or as required by law.</p>

        <h2>7. Cookies and Analytics</h2>
        <p>We may use cookies and third-party analytics tools to understand user behavior and improve the App. You can adjust cookie settings in your browser.</p>

        <h2>8. Children’s Privacy</h2>
        <p>GreenerMe is not intended for individuals under 18 years of age. We do not knowingly collect data from children.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Continued use of the App after changes are posted constitutes your acceptance of the revised Policy.</p>

        <h2>10. Contact Us</h2>
        <p>If you have any questions or requests regarding this Privacy Policy, please contact us at privacy@greenerme.ie.</p>
      </main>
      <Footer />
    </div>
  );
}
