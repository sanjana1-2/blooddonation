import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authAPI } from '../services/api'
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await authAPI.login(formData)
      
      // Store token and user data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      toast.success(`Welcome back, ${response.data.user.firstName}!`)
      
      // Redirect based on role
      switch (response.data.user.role) {
        case 'admin':
          navigate('/analytics')
          break
        case 'bloodbank':
          navigate('/blood-banks')
          break
        case 'hospital':
          navigate('/blood-requests')
          break
        default:
          navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h1>🩸 Welcome Back</h1>
            <p>Sign in to your eRaktkosh account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary auth-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <span>•</span>
            <Link to="/register">Create Account</Link>
          </div>

          <div className="demo-accounts">
            <h4>Demo Accounts</h4>
            <div className="demo-grid">
              <div className="demo-account">
                <strong>Admin:</strong> admin@eraktkosh.in / admin123
              </div>
              <div className="demo-account">
                <strong>Donor:</strong> donor@eraktkosh.in / donor123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login