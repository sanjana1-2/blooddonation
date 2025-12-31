import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authAPI } from '../services/api'
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [rememberMe, setRememberMe] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/'

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      const userData = JSON.parse(user)
      redirectBasedOnRole(userData.role)
    }
  }, [])

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/analytics', { replace: true })
        break
      case 'bloodbank':
        navigate('/blood-banks', { replace: true })
        break
      case 'hospital':
        navigate('/blood-requests', { replace: true })
        break
      case 'donor':
        navigate('/donor-profile', { replace: true })
        break
      default:
        navigate(from, { replace: true })
    }
  }

  const handleDemoLogin = async (email, password) => {
    setFormData({ email, password })
    setIsLoading(true)

    try {
      const response = await authAPI.login({ email, password })
      
      // Store token and user data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email)
      }
      
      toast.success(`Welcome back, ${response.data.user.firstName}!`)
      redirectBasedOnRole(response.data.user.role)
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)

    try {
      const response = await authAPI.login(formData)
      
      // Store token and user data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }
      
      toast.success(`Welcome back, ${response.data.user.firstName}!`)
      redirectBasedOnRole(response.data.user.role)
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      toast.error(errorMessage)
      
      // Set specific field errors if available
      if (error.response?.status === 401) {
        setErrors({ password: 'Invalid email or password' })
      }
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

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
                autoComplete="email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary auth-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <span>•</span>
            <Link to="/register">Create Account</Link>
          </div>

          <div className="demo-accounts">
            <h4>Quick Demo Login</h4>
            <div className="demo-grid">
              <button 
                className="demo-account-btn"
                onClick={() => handleDemoLogin('admin@eraktkosh.in', 'admin123')}
                disabled={isLoading}
              >
                <strong>👨‍💼 Admin</strong>
                <span>Full system access</span>
              </button>
              <button 
                className="demo-account-btn"
                onClick={() => handleDemoLogin('donor@eraktkosh.in', 'donor123')}
                disabled={isLoading}
              >
                <strong>🩸 Donor</strong>
                <span>Donor dashboard</span>
              </button>
              <button 
                className="demo-account-btn"
                onClick={() => handleDemoLogin('hospital@eraktkosh.in', 'hospital123')}
                disabled={isLoading}
              >
                <strong>🏥 Hospital</strong>
                <span>Request management</span>
              </button>
            </div>
            
            <div className="demo-credentials">
              <details>
                <summary>Manual Login Credentials</summary>
                <div className="credentials-list">
                  <div><strong>Admin:</strong> admin@eraktkosh.in / admin123</div>
                  <div><strong>Donor:</strong> donor@eraktkosh.in / donor123</div>
                  <div><strong>Hospital:</strong> hospital@eraktkosh.in / hospital123</div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login