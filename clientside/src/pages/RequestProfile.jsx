import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { requestsAPI, donorsAPI } from '../services/api'
import './RequestProfile.css'

const RequestProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState(null)
  const [matchingDonors, setMatchingDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    if (id) {
      fetchRequest()
    }
  }, [id])

  const fetchRequest = async () => {
    try {
      const response = await requestsAPI.getById(id)
      setRequest(response.data)
      
      // Fetch matching donors
      if (response.data.bloodGroup) {
        fetchMatchingDonors(response.data.bloodGroup)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching request:', error)
      toast.error('Failed to load request details')
      navigate('/blood-requests')
    }
  }

  const fetchMatchingDonors = async (bloodGroup) => {
    try {
      const response = await donorsAPI.searchByBloodGroup(bloodGroup)
      setMatchingDonors(response.data)
    } catch (error) {
      console.error('Error fetching matching donors:', error)
    }
  }

  const handleStatusUpdate = async (newStatus) => {
    try {
      await requestsAPI.updateStatus(id, newStatus)
      setRequest(prev => ({ ...prev, status: newStatus }))
      toast.success(`Request ${newStatus} successfully!`)
    } catch (error) {
      toast.error('Failed to update request status')
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return '#dc3545'
      case 'high': return '#fd7e14'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
      default: return '#6c757d'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107'
      case 'fulfilled': return '#28a745'
      case 'cancelled': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getTimeRemaining = (requiredBy) => {
    const now = new Date()
    const deadline = new Date(requiredBy)
    const diff = deadline - now
    
    if (diff <= 0) return { text: 'Overdue', class: 'overdue' }
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return { text: `${days} day${days > 1 ? 's' : ''} left`, class: 'normal' }
    }
    
    if (hours < 6) {
      return { text: `${hours}h ${minutes}m left`, class: 'urgent' }
    }
    
    return { text: `${hours}h ${minutes}m left`, class: 'normal' }
  }

  const getCompatibleBloodGroups = (requestedGroup) => {
    const compatibility = {
      'A+': ['A+', 'A-', 'O+', 'O-'],
      'A-': ['A-', 'O-'],
      'B+': ['B+', 'B-', 'O+', 'O-'],
      'B-': ['B-', 'O-'],
      'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      'AB-': ['A-', 'B-', 'AB-', 'O-'],
      'O+': ['O+', 'O-'],
      'O-': ['O-']
    }
    return compatibility[requestedGroup] || []
  }

  if (loading) {
    return (
      <div className="request-profile loading">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading request details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="request-profile">
        <div className="container">
          <div className="error-message">
            <h2>Request not found</h2>
            <button className="btn btn-primary" onClick={() => navigate('/blood-requests')}>
              Back to Requests
            </button>
          </div>
        </div>
      </div>
    )
  }

  const timeRemaining = getTimeRemaining(request.requiredBy)

  return (
    <div className="request-profile">
      <div className="container">
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate('/blood-requests')}>
            ← Back to Requests
          </button>
          <div className="request-id">Request ID: #{request._id?.slice(-8)}</div>
        </div>

        <div className="request-overview">
          <div className="overview-card">
            <div className="patient-info">
              <h1>{request.patientName}</h1>
              <div className="blood-group-large">
                {request.bloodGroup}
              </div>
              <div className="units-required">
                {request.unitsRequired} unit{request.unitsRequired > 1 ? 's' : ''} required
              </div>
            </div>
            
            <div className="request-status-info">
              <div 
                className="urgency-badge large"
                style={{ backgroundColor: getUrgencyColor(request.urgency) }}
              >
                {request.urgency.toUpperCase()}
              </div>
              
              <div 
                className="status-badge large"
                style={{ backgroundColor: getStatusColor(request.status) }}
              >
                {request.status.toUpperCase()}
              </div>
              
              <div className={`time-remaining ${timeRemaining.class}`}>
                ⏰ {timeRemaining.text}
              </div>
            </div>
          </div>

          {request.status === 'pending' && (
            <div className="quick-actions">
              <button 
                className="btn btn-success"
                onClick={() => handleStatusUpdate('fulfilled')}
              >
                ✅ Mark as Fulfilled
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleStatusUpdate('cancelled')}
              >
                ❌ Cancel Request
              </button>
            </div>
          )}
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            📋 Request Details
          </button>
          <button 
            className={`tab-btn ${activeTab === 'donors' ? 'active' : ''}`}
            onClick={() => setActiveTab('donors')}
          >
            👥 Matching Donors ({matchingDonors.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            📅 Timeline
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details-tab">
              <div className="details-grid">
                <div className="details-section">
                  <h3>🏥 Hospital Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Hospital Name:</span>
                      <span className="value">{request.hospital?.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Address:</span>
                      <span className="value">{request.hospital?.address}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Phone:</span>
                      <span className="value">{request.hospital?.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h3>👤 Requester Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Name:</span>
                      <span className="value">{request.requesterName}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Phone:</span>
                      <span className="value">{request.requesterPhone}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Email:</span>
                      <span className="value">{request.requesterEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h3>📋 Request Details</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Required By:</span>
                      <span className="value">{new Date(request.requiredBy).toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Submitted:</span>
                      <span className="value">{new Date(request.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Compatible Groups:</span>
                      <span className="value">
                        {getCompatibleBloodGroups(request.bloodGroup).join(', ')}
                      </span>
                    </div>
                  </div>
                  
                  {request.notes && (
                    <div className="notes-section">
                      <h4>Additional Notes:</h4>
                      <p>{request.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donors' && (
            <div className="donors-tab">
              <div className="donors-header">
                <h3>Available Donors for {request.bloodGroup}</h3>
                <p>Found {matchingDonors.length} matching donors</p>
              </div>
              
              {matchingDonors.length === 0 ? (
                <div className="no-donors">
                  <div className="empty-icon">👥</div>
                  <h4>No matching donors found</h4>
                  <p>Try expanding search to compatible blood groups</p>
                </div>
              ) : (
                <div className="donors-grid">
                  {matchingDonors.map(donor => (
                    <div key={donor._id} className="donor-card">
                      <div className="donor-avatar">
                        {donor.firstName.charAt(0)}{donor.lastName.charAt(0)}
                      </div>
                      <div className="donor-info">
                        <h4>{donor.firstName} {donor.lastName}</h4>
                        <div className="donor-details">
                          <span className="blood-group">{donor.bloodGroup}</span>
                          <span className="location">{donor.city}, {donor.state}</span>
                          <span className="phone">{donor.phone}</span>
                        </div>
                      </div>
                      <div className="donor-actions">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/donor-profile/${donor._id}`)}
                        >
                          View Profile
                        </button>
                        <button className="btn btn-success btn-sm">
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="timeline-tab">
              <div className="timeline">
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Request Submitted</h4>
                    <p>{new Date(request.createdAt).toLocaleString()}</p>
                    <span>Request created by {request.requesterName}</span>
                  </div>
                </div>
                
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Donors Notified</h4>
                    <p>{new Date(request.createdAt).toLocaleString()}</p>
                    <span>{matchingDonors.length} matching donors notified</span>
                  </div>
                </div>
                
                {request.status === 'fulfilled' && (
                  <div className="timeline-item completed">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Request Fulfilled</h4>
                      <p>{new Date().toLocaleString()}</p>
                      <span>Blood units successfully provided</span>
                    </div>
                  </div>
                )}
                
                {request.status === 'cancelled' && (
                  <div className="timeline-item cancelled">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Request Cancelled</h4>
                      <p>{new Date().toLocaleString()}</p>
                      <span>Request was cancelled</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestProfile