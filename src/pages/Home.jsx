import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Save Lives, Donate Blood</h1>
            <p>Join India's largest blood donation network and help save lives across the nation</p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Find Blood Banks</button>
              <button className="btn btn-secondary">Register as Donor</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="blood-drop">🩸</div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>2,500+</h3>
              <p>Blood Banks</p>
            </div>
            <div className="stat-card">
              <h3>50,000+</h3>
              <p>Registered Donors</p>
            </div>
            <div className="stat-card">
              <h3>1,00,000+</h3>
              <p>Lives Saved</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Emergency Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Find Blood Banks</h3>
              <p>Locate nearby blood banks and check blood availability in real-time</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👤</div>
              <h3>Donor Registration</h3>
              <p>Register as a voluntary blood donor and save lives in your community</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Mobile App</h3>
              <p>Download our mobile app for quick access to blood donation services</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🚨</div>
              <h3>Emergency Request</h3>
              <p>Submit emergency blood requests and get immediate assistance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="blood-groups">
        <div className="container">
          <h2>Blood Group Compatibility</h2>
          <div className="compatibility-chart">
            <div className="blood-group">
              <h4>Universal Donor</h4>
              <div className="group-badge o-negative">O-</div>
              <p>Can donate to all blood groups</p>
            </div>
            <div className="blood-group">
              <h4>Universal Recipient</h4>
              <div className="group-badge ab-positive">AB+</div>
              <p>Can receive from all blood groups</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home