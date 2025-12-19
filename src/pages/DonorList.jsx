import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { donorsAPI } from '../services/api'
import { isAdmin, getPermissionLevel } from '../utils/permissions'
import './DonorList.css'

const DonorList = () => {
  const navigate = useNavigate()
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBloodGroup, setFilterBloodGroup] = useState('')
  const [filterState, setFilterState] = useState('')
  const permissions = getPermissionLevel()

  useEffect(() => {
    fetchDonors()
    // Auto-refresh every 10 seconds to show new registrations
    const interval = setInterval(fetchDonors, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchDonors = async () => {
    try {
      const response = await donorsAPI.getAll()
      setDonors(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching donors:', error)
      toast.error('Failed to load donors')
      setLoading(false)
    }
  }

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBloodGroup = !filterBloodGroup || donor.bloodGroup === filterBloodGroup
    const matchesState = !filterState || donor.state.toLowerCase().includes(filterState.toLowerCase())
    
    return matchesSearch && matchesBloodGroup && matchesState
  })

  const getBloodGroupStats = () => {
    const stats = {}
    donors.forEach(donor => {
      stats[donor.bloodGroup] = (stats[donor.bloodGroup] || 0) + 1
    })
    return stats
  }

  const bloodGroupStats = getBloodGroupStats()

  return (
    <div className="donor-list">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <h1>Registered Blood Donors</h1>
            {!isAdmin() && (
              <div className="access-level">
                <span className="access-badge">👁️ View Only Access</span>
              </div>
            )}
          </div>
          <div className="stats-summary">
            <div className="total-donors">
              <span className="count">{donors.length}</span>
              <span className="label">Total Donors</span>
            </div>
            <div className="live-indicator">
              <span className="pulse-dot"></span>
              {isAdmin() ? 'Admin View' : 'Live Updates'}
            </div>
          </div>
        </div>

        <div className="blood-group-stats">
          <h3>Donors by Blood Group</h3>
          <div className="stats-grid">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
              <div key={group} className="stat-item">
                <span className="blood-group">{group}</span>
                <span className="count">{bloodGroupStats[group] || 0}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="filters-section">
          <div className="filters">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <select 
                value={filterBloodGroup} 
                onChange={(e) => setFilterBloodGroup(e.target.value)}
              >
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
            <div className="filter-group">
              <select 
                value={filterState} 
                onChange={(e) => setFilterState(e.target.value)}
              >
                <option value="">All States</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="donors-container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              Loading donors...
            </div>
          ) : filteredDonors.length === 0 ? (
            <div className="no-donors">
              <div className="empty-icon">👥</div>
              <h3>No donors found</h3>
              <p>No donors match your search criteria</p>
            </div>
          ) : (
            <div className="donors-grid">
              {filteredDonors.map((donor, index) => (
                <div 
                  key={donor._id || index} 
                  className="donor-card"
                  onClick={() => navigate(`/donor-profile/${donor._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="donor-header">
                    <div className="donor-avatar">
                      {donor.firstName.charAt(0)}{donor.lastName.charAt(0)}
                    </div>
                    <div className="donor-info">
                      <h3>{donor.firstName} {donor.lastName}</h3>
                      <p className="donor-email">{donor.email}</p>
                    </div>
                    <div className="blood-group-badge">
                      {donor.bloodGroup}
                    </div>
                  </div>
                  
                  <div className="donor-details">
                    <div className="detail-item">
                      <span className="icon">📞</span>
                      <span>{donor.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon">🎂</span>
                      <span>{new Date(donor.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon">⚖️</span>
                      <span>{donor.weight} kg</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon">📍</span>
                      <span>{donor.city}, {donor.state}</span>
                    </div>
                  </div>
                  
                  <div className="donor-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/donor-profile/${donor._id}`)
                      }}
                    >
                      {isAdmin() ? '✏️ Manage' : '👁️ View'}
                    </button>
                    {isAdmin() ? (
                      <button 
                        className="btn btn-danger"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🗑️ Delete
                      </button>
                    ) : (
                      <button 
                        className="btn btn-secondary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        📞 Contact
                      </button>
                    )}
                  </div>
                  
                  <div className="registration-date">
                    Registered: {new Date(donor.createdAt).toLocaleDateString()}
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

export default DonorList