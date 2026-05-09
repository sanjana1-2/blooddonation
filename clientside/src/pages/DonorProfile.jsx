import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import QRCode from 'react-qr-code'
import { donorsAPI } from '../services/api'
import { isAdmin, getPermissionLevel } from '../utils/permissions'
import './DonorProfile.css'

const DonorProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [donor, setDonor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const permissions = getPermissionLevel()

  useEffect(() => {
    if (id) {
      fetchDonor()
    }
  }, [id])

  const fetchDonor = async () => {
    try {
      const response = await donorsAPI.getById(id)
      setDonor(response.data)
      setEditData(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching donor:', error)
      toast.error('Failed to load donor profile')
      navigate('/donor-list')
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      await donorsAPI.update(id, editData)
      setDonor(editData)
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleCancel = () => {
    setEditData(donor)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const getLastDonationStatus = () => {
    if (!donor.lastDonation) return 'Never donated'
    
    const lastDonation = new Date(donor.lastDonation)
    const today = new Date()
    const daysDiff = Math.floor((today - lastDonation) / (1000 * 60 * 60 * 24))
    
    if (daysDiff < 56) {
      return `Not eligible (${56 - daysDiff} days remaining)`
    }
    
    return 'Eligible to donate'
  }

  const getDonationHistory = () => {
    // Simulated donation history
    return [
      { date: '2024-01-15', location: 'AIIMS Blood Bank', units: 1, status: 'Completed' },
      { date: '2023-11-20', location: 'Red Cross Society', units: 1, status: 'Completed' },
      { date: '2023-09-10', location: 'Max Hospital', units: 1, status: 'Completed' }
    ]
  }

  if (loading) {
    return (
      <div className="donor-profile loading">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading donor profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!donor) {
    return (
      <div className="donor-profile">
        <div className="container">
          <div className="error-message">
            <h2>Donor not found</h2>
            <button className="btn btn-primary" onClick={() => navigate('/donor-list')}>
              Back to Donor List
            </button>
          </div>
        </div>
      </div>
    )
  }

  const qrData = JSON.stringify({
    id: donor._id,
    name: `${donor.firstName} ${donor.lastName}`,
    bloodGroup: donor.bloodGroup,
    phone: donor.phone,
    email: donor.email
  })

  return (
    <div className="donor-profile">
      <div className="container">
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate('/donor-list')}>
            ← Back to List
          </button>
          <div className="profile-actions">
            {isAdmin() && (
              <>
                {!isEditing ? (
                  <button className="btn btn-primary" onClick={handleEdit}>
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="btn btn-success" onClick={handleSave}>
                      💾 Save Changes
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </>
            )}
            {!isAdmin() && (
              <div className="view-only-notice">
                <span className="notice-icon">👁️</span>
                <span>View Only Mode</span>
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <div className="donor-card">
              <div className="donor-avatar-large">
                {donor.firstName.charAt(0)}{donor.lastName.charAt(0)}
              </div>
              
              <div className="donor-basic-info">
                {isEditing ? (
                  <div className="edit-form">
                    <div className="form-row">
                      <input
                        type="text"
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                ) : (
                  <h1>{donor.firstName} {donor.lastName}</h1>
                )}
                
                <div className="blood-group-large">
                  {isEditing ? (
                    <select name="bloodGroup" value={editData.bloodGroup} onChange={handleChange}>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    donor.bloodGroup
                  )}
                </div>
                
                <div className="donor-status">
                  <span className={`status-badge ${getLastDonationStatus().includes('Eligible') ? 'eligible' : 'not-eligible'}`}>
                    {getLastDonationStatus()}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="details-section">
                <h3>Personal Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="label">Email:</span>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="value">{donor.email}</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Phone:</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="value">{donor.phone}</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Age:</span>
                    <span className="value">{calculateAge(donor.dateOfBirth)} years</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Gender:</span>
                    {isEditing ? (
                      <select name="gender" value={editData.gender} onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <span className="value">{donor.gender}</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Weight:</span>
                    {isEditing ? (
                      <input
                        type="number"
                        name="weight"
                        value={editData.weight}
                        onChange={handleChange}
                        min="50"
                      />
                    ) : (
                      <span className="value">{donor.weight} kg</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Registration Date:</span>
                    <span className="value">{new Date(donor.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Address Information</h3>
                <div className="details-grid">
                  <div className="detail-item full-width">
                    <span className="label">Address:</span>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                        rows="2"
                      />
                    ) : (
                      <span className="value">{donor.address}</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">City:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={editData.city}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="value">{donor.city}</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">State:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="state"
                        value={editData.state}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="value">{donor.state}</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">PIN Code:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="pincode"
                        value={editData.pincode}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="value">{donor.pincode}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Emergency Contact</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="label">Name:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyContact.name"
                        value={editData.emergencyContact?.name || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="value">{donor.emergencyContact?.name}</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Phone:</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="emergencyContact.phone"
                        value={editData.emergencyContact?.phone || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="value">{donor.emergencyContact?.phone}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-sidebar">
            <div className="qr-section">
              <h3>Donor QR Code</h3>
              <div className="qr-code-container">
                <QRCode value={qrData} size={150} />
              </div>
              <p>Scan to view donor information</p>
            </div>

            <div className="donation-history">
              <h3>Donation History</h3>
              <div className="history-list">
                {getDonationHistory().map((donation, index) => (
                  <div key={index} className="history-item">
                    <div className="history-date">
                      {new Date(donation.date).toLocaleDateString()}
                    </div>
                    <div className="history-details">
                      <div className="history-location">{donation.location}</div>
                      <div className="history-units">{donation.units} unit(s)</div>
                    </div>
                    <div className={`history-status ${donation.status.toLowerCase()}`}>
                      {donation.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="btn btn-primary">
                  📞 Contact Donor
                </button>
                {isAdmin() && (
                  <>
                    <button className="btn btn-success">
                      🩸 Schedule Donation
                    </button>
                    <button className="btn btn-info">
                      📧 Send Email
                    </button>
                    <button className="btn btn-warning">
                      📱 Send SMS
                    </button>
                    <button className="btn btn-danger">
                      🗑️ Delete Donor
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonorProfile