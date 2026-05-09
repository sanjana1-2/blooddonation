import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectIsAuthenticated } from '../store/slices/authSlice'
import { Button } from "@/components/ui/button"
import { ShieldAlert } from 'lucide-react'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (requireAdmin && user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-rose-600">
          <ShieldAlert size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          You don't have the necessary administrative permissions to access this page. 
          Please contact your administrator if you believe this is an error.
        </p>
        <Button 
          variant="outline"
          className="rounded-full"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    )
  }
  
  return children
}

export default ProtectedRoute