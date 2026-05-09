import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as HotToaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import BloodBanks from './pages/BloodBanks'
import DonorRegistration from './pages/DonorRegistration'
import DonorList from './pages/DonorList'
import BloodAvailability from './pages/BloodAvailability'
import BloodRequests from './pages/BloodRequests'
import EmergencyRequest from './pages/EmergencyRequest'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Register from './pages/Register'
import DonorProfile from './pages/DonorProfile'
import RequestProfile from './pages/RequestProfile'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blood-banks" element={<BloodBanks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Public routes */}
            <Route path="/emergency-request" element={<EmergencyRequest />} />
            <Route path="/donor-registration" element={<DonorRegistration />} />
            
            {/* Protected routes - require login */}
            <Route path="/donor-list" element={
              <ProtectedRoute>
                <DonorList />
              </ProtectedRoute>
            } />
            <Route path="/blood-availability" element={
              <ProtectedRoute>
                <BloodAvailability />
              </ProtectedRoute>
            } />
            <Route path="/blood-requests" element={
              <ProtectedRoute>
                <BloodRequests />
              </ProtectedRoute>
            } />
            <Route path="/donor-profile/:id" element={
              <ProtectedRoute>
                <DonorProfile />
              </ProtectedRoute>
            } />
            <Route path="/request-profile/:id" element={
              <ProtectedRoute>
                <RequestProfile />
              </ProtectedRoute>
            } />
            
            {/* Admin-only routes */}
            <Route path="/analytics" element={
              <ProtectedRoute requireAdmin={true}>
                <Analytics />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <Toaster />
        <HotToaster position="bottom-right" />
      </div>
    </Router>
  )
}

export default App