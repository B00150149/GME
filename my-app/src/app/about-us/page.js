'use client';
import React, { useState } from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/About.css'; 

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission (send data to an API or save it)
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
      <Header />
      <div className="about-container">
        <section className="about-section">
          <h1 className="about-title">About Us</h1>
          <p className="about-description">
            At GreenerMe, we are committed to creating a sustainable future through eco-friendly practices.
            Our mission is to build a community of eco-conscious individuals who want to make a positive impact on the environment.
          </p>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-form-container">
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
