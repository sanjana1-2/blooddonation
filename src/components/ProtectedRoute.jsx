import React from 'react'
import { Navigate } from 'react-router-dom'
import { isLoggedIn, isAdmin } from '../utils/permissions'

const ProtectedRoute = ({ children, requireAdmin = false, requireAuth = true }) => {
  if (requireAuth && !isLoggedIn()) {
    return <Navigate to="/login" replace />
  }
  
  if (requireAdmin && !isAdmin()) {
    return (
      <div className="access-denied">
        <div className="container">
          <div className="access-denied-content">
            <div className="access-icon">🚫</div>
            <h2>Access Denied</h2>
            <p>You don't have permission to access this page.</p>
            <p>Admin access required.</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return children
}

export default ProtectedRoute