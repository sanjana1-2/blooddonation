import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { requestsAPI } from '../services/api'
import './BloodRequests.css'

const BloodRequests = () => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterUrgency, setFilterUrgency] = useState('')
  const [filterBloodGroup, setFilterBloodGroup] = useState('')

  useEffect(() => {
    fetchRequests()
    // Auto-refresh every 15 seconds to show new requests
    const interval = setInterval(fetchRequests, 15000)
    return () => clearInterval(interval)
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await requestsAPI.getAll()
      setRequests(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching requests:', error)
      toast.error('Failed to load blood requests')
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await requestsAPI.updateStatus(requestId, newStatus)
      toast.success(`Request ${newStatus} successfully!`)
      fetchRequests() // Refresh the list
    } catch (error) {
      toast.error('Failed to update request status')
    }
  }

  const filteredRequests = requests.filter(request => {
    const matchesStatus = !filterStatus || request.status === filterStatus
    const matchesUrgency = !filterUrgency || request.urgency === filterUrgency
    const matchesBloodGroup = !filterBloodGroup || request.bloodGroup === filterBloodGroup
    
    return matchesStatus && matchesUrgency && matchesBloodGroup
  })

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
    
    if (diff <= 0) return 'Overdue'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days} day${days > 1 ? 's' : ''} left`
    }
    
    return `${hours}h ${minutes}m left`
  }

  const urgencyStats = {
    critical: requests.filter(r => r.urgency === 'critical' && r.status === 'pending').length,
    high: requests.filter(r => r.urgency === 'high' && r.status === 'pending').length,
    medium: requests.filter(r => r.urgency === 'medium' && r.status === 'pending').length,
    low: requests.filter(r => r.urgency === 'low' && r.status === 'pending').length
  }

  return (
    <div className="blood-requests">
      <div className="container">
        <div className="page-header">
          <h1>Blood Requests Dashboard</h1>
          <div className="stats-summary">
            <div className="total-requests">
              <span className="count">{requests.length}</span>
              <span className="label">Total Requests</span>
            </div>
            <div className="live-indicator">
              <span className="pulse-dot"></span>
              Live Updates
            </div>
          </div>
        </div>

        <div className="urgency-stats">
          <h3>Requests by Urgency</h3>
          <div className="urgency-grid">
            <div className="urgency-card critical">
              <div className="urgency-icon">🚨</div>
              <div className="urgency-info">
                <span className="count">{urgencyStats.critical}</span>
                <span className="label">Critical</span>
              </div>
            </div>
            <div className="urgency-card high">
              <div className="urgency-icon">⚡</div>
              <div className="urgency-info">
                <span className="count">{urgencyStats.high}</span>
                <span className="label">High</span>
              </div>
            </div>
            <div className="urgency-card medium">
              <div className="urgency-icon">⚠️</div>
              <div className="urgency-info">
                <span className="count">{urgencyStats.medium}</span>
                <span className="label">Medium</span>
              </div>
            </div>
            <div className="urgency-card low">
              <div className="urgency-icon">ℹ️</div>
              <div className="urgency-info">
                <span className="count">{urgencyStats.low}</span>
                <span className="label">Low</span>
              </div>
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="filters">
            <div className="filter-group">
              <label>Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Urgency</label>
              <select value={filterUrgency} onChange={(e) => setFilterUrgency(e.target.value)}>
                <option value="">All Urgency</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Blood Group</label>
              <select value={filterBloodGroup} onChange={(e) => setFilterBloodGroup(e.target.value)}>
                <option value="">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </div>

        <div className="requests-container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              Loading blood requests...
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="no-requests">
              <div className="empty-icon">📋</div>
              <h3>No blood requests found</h3>
              <p>No requests match your filter criteria</p>
            </div>
          ) : (
            <div className="requests-list">
              {filteredRequests.map((request, index) => (
                <div 
                  key={request._id || index} 
                  className={`request-card ${request.urgency}`}
                  onClick={() => navigate(`/request-profile/${request._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="request-header">
                    <div className="patient-info">
                      <h3>{request.patientName}</h3>
                      <div className="blood-group-badge">
                        {request.bloodGroup}
                      </div>
                    </div>
                    <div className="urgency-badge" style={{ backgroundColor: getUrgencyColor(request.urgency) }}>
                      {request.urgency.toUpperCase()}
                    </div>
                  </div>

                  <div className="request-details">
                    <div className="detail-row">
                      <div className="detail-item">
                        <span className="icon">🩸</span>
                        <span><strong>{request.unitsRequired}</strong> units required</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">⏰</span>
                        <span className={getTimeRemaining(request.requiredBy) === 'Overdue' ? 'overdue' : ''}>
                          {getTimeRemaining(request.requiredBy)}
                        </span>
                      </div>
                    </div>

                    <div className="hospital-info">
                      <div className="detail-item">
                        <span className="icon">🏥</span>
                        <span>{request.hospital?.name}</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">📍</span>
                        <span>{request.hospital?.address}</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">📞</span>
                        <span>{request.hospital?.phone}</span>
                      </div>
                    </div>

                    <div className="requester-info">
                      <div className="detail-item">
                        <span className="icon">👤</span>
                        <span>{request.requesterName}</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">📱</span>
                        <span>{request.requesterPhone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">✉️</span>
                        <span>{request.requesterEmail}</span>
                      </div>
                    </div>

                    {request.notes && (
                      <div className="notes">
                        <strong>Notes:</strong> {request.notes}
                      </div>
                    )}
                  </div>

                  <div className="request-footer">
                    <div className="status-info">
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(request.status) }}
                      >
                        {request.status.toUpperCase()}
                      </span>
                      <span className="request-date">
                        Submitted: {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {request.status === 'pending' && (
                      <div className="action-buttons">
                        <button 
                          className="btn btn-success"
                          onClick={() => handleStatusUpdate(request._id, 'fulfilled')}
                        >
                          Mark Fulfilled
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleStatusUpdate(request._id, 'cancelled')}
                        >
                          Cancel Request
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BloodRequests