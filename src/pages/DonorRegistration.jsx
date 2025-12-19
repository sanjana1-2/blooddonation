import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { donorsAPI } from '../services/api'
import './DonorRegistration.css'

const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    weight: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    medicalHistory: '',
    lastDonation: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await donorsAPI.register(formData)
      toast.success('🎉 Registration successful! Welcome to our donor community!')
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('donorRegistered', { 
        detail: { donor: formData } 
      }))
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        weight: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        medicalHistory: '',
        lastDonation: '',
        emergencyContact: '',
        emergencyPhone: ''
      })
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Registration failed. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="donor-registration">
      <div className="container">
        <div className="registration-header">
          <h1>Become a Blood Donor</h1>
          <p>Join thousands of heroes who save lives through blood donation</p>
        </div>

        <div className="eligibility-info">
          <h3>Eligibility Criteria</h3>
          <div className="criteria-grid">
            <div className="criteria-item">
              <span className="icon">🎂</span>
              <span>Age: 18-65 years</span>
            </div>
            <div className="criteria-item">
              <span className="icon">⚖️</span>
              <span>Weight: Minimum 50 kg</span>
            </div>
            <div className="criteria-item">
              <span className="icon">❤️</span>
              <span>Good health condition</span>
            </div>
            <div className="criteria-item">
              <span className="icon">🩸</span>
              <span>No recent illness</span>
            </div>
          </div>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Medical Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Blood Group *</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                  <option value="">Select Blood Group</option>
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
              <div className="form-group">
                <label>Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="50"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Last Blood Donation Date</label>
              <input
                type="date"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Address Information</h3>
            <div className="form-group">
              <label>Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State *</label>
                <select name="state" value={formData.state} onChange={handleChange} required>
                  <option value="">Select State</option>
                  <option value="delhi">Delhi</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                </select>
              </div>
              <div className="form-group">
                <label>PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  pattern="[0-9]{6}"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Emergency Contact</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Emergency Contact Name *</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Emergency Contact Phone *</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register as Donor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonorRegistration