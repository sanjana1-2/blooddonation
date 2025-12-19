import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>eRaktkosh</h3>
            <p>National Blood Donation Portal</p>
            <p>Ministry of Health & Family Welfare</p>
            <p>Government of India</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/blood-banks">Blood Banks</a></li>
              <li><a href="/donor-registration">Register as Donor</a></li>
              <li><a href="/blood-availability">Blood Availability</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Emergency</h4>
            <ul>
              <li><a href="/emergency-request">Emergency Request</a></li>
              <li><a href="tel:1075">Helpline: 1075</a></li>
              <li><a href="mailto:help@eraktkosh.in">help@eraktkosh.in</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#about">About Blood Donation</a></li>
              <li><a href="#eligibility">Eligibility Criteria</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-logos">
            <img src="/govt-logo.png" alt="Government of India" className="govt-logo" />
            <img src="/health-ministry-logo.png" alt="Ministry of Health" className="ministry-logo" />
          </div>
          <p>&copy; 2024 eRaktkosh Portal. All rights reserved. | Developed for the people of India</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer