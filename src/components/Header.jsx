import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { donorsAPI, requestsAPI } from '../services/api'
import { isAdmin, getUserRole, getCurrentUser } from '../utils/permissions'
import NotificationCenter from './NotificationCenter'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [donorCount, setDonorCount] = useState(0)
  const [urgentRequests, setUrgentRequests] = useState(0)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCounts()
    
    // Check for logged in user
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    // Listen for new donor registrations
    const handleDonorRegistered = () => {
      fetchCounts()
      // Show a brief notification in the navbar
      setDonorCount(prev => prev + 1)
    }
    
    // Listen for new blood requests
    const handleRequestSubmitted = () => {
      fetchCounts()
      setUrgentRequests(prev => prev + 1)
    }
    
    window.addEventListener('donorRegistered', handleDonorRegistered)
    window.addEventListener('requestSubmitted', handleRequestSubmitted)
    
    // Refresh counts every 30 seconds
    const interval = setInterval(fetchCounts, 30000)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('donorRegistered', handleDonorRegistered)
      window.removeEventListener('requestSubmitted', handleRequestSubmitted)
    }
  }, [])

  const fetchCounts = async () => {
    try {
      const [donorsResponse, requestsResponse] = await Promise.all([
        donorsAPI.getAll(),
        requestsAPI.getUrgent()
      ])
      setDonorCount(donorsResponse.data.length)
      setUrgentRequests(requestsResponse.data.length)
    } catch (error) {
      console.error('Error fetching counts:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-info">
            <span>National Blood Donation Portal</span>
            <span>Ministry of Health & Family Welfare, Government of India</span>
          </div>
        </div>
      </div>
      
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <img src="/logo.png" alt="eRaktkosh" className="logo" />
            <h1>eRaktkosh</h1>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/blood-banks" className="nav-link">Blood Banks</Link>
            
            {/* Show different options based on user role */}
            {!user && (
              <>
                <Link to="/donor-registration" className="nav-link">Register as Donor</Link>
                <Link to="/emergency-request" className="nav-link emergency-link">Emergency</Link>
              </>
            )}
            
            {user && (
              <>
                <Link to="/donor-list" className="nav-link">
                  Donors {isAdmin() && donorCount > 0 && <span className="count-badge">{donorCount}</span>}
                </Link>
                <Link to="/blood-availability" className="nav-link">Blood Availability</Link>
                <Link to="/blood-requests" className="nav-link">
                  Requests {isAdmin() && urgentRequests > 0 && <span className="count-badge">{urgentRequests}</span>}
                </Link>
                <Link to="/emergency-request" className="nav-link emergency-link">
                  Emergency {urgentRequests > 0 && <span className="urgent-badge">{urgentRequests}</span>}
                </Link>
              </>
            )}
            
            {/* Admin-only features */}
            {isAdmin() && (
              <>
                <Link to="/analytics" className="nav-link admin-link">📊 Analytics</Link>
                <Link to="/donor-registration" className="nav-link admin-link">➕ Add Donor</Link>
              </>
            )}
          </div>
          
          <div className="auth-section">
            <NotificationCenter />
            {user ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-greeting">Hi, {user.firstName}</span>
                  <span className="user-role">{user.role}</span>
                </div>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </div>
            )}
          </div>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header