import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { requestsAPI } from '../services/api'
import './EmergencyRequest.css'

const EmergencyRequest = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    unitsRequired: '',
    urgency: 'high',
    hospitalName: '',
    hospitalAddress: '',
    hospitalPhone: '',
    requesterName: '',
    requesterPhone: '',
    requesterEmail: '',
    requiredBy: '',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const requestData = {
        patientName: formData.patientName,
        bloodGroup: formData.bloodGroup,
        unitsRequired: parseInt(formData.unitsRequired),
        urgency: formData.urgency,
        hospital: {
          name: formData.hospitalName,
          address: formData.hospitalAddress,
          phone: formData.hospitalPhone
        },
        requesterName: formData.requesterName,
        requesterPhone: formData.requesterPhone,
        requesterEmail: formData.requesterEmail,
        requiredBy: new Date(formData.requiredBy),
        notes: formData.notes
      }

      await requestsAPI.create(requestData)
      toast.success('🚨 Emergency request submitted successfully! We will contact you shortly.')
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('requestSubmitted', { 
        detail: { request: requestData } 
      }))
      
      // Reset form
      setFormData({
        patientName: '',
        bloodGroup: '',
        unitsRequired: '',
        urgency: 'high',
        hospitalName: '',
        hospitalAddress: '',
        hospitalPhone: '',
        requesterName: '',
        requesterPhone: '',
        requesterEmail: '',
        requiredBy: '',
        notes: ''
      })
    } catch (error) {
      toast.error('Failed to submit request. Please try again.')
      console.error('Error submitting request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="emergency-request">
      <div className="container">
        <div className="emergency-header">
          <div className="emergency-icon">🚨</div>
          <h1>Emergency Blood Request</h1>
          <p>Submit an urgent blood requirement request for immediate assistance</p>
          <div className="helpline-info">
            <span className="helpline">24/7 Helpline: <a href="tel:1075">1075</a></span>
          </div>
        </div>

        <div className="emergency-alerts">
          <div className="alert alert-danger">
            <strong>Critical Notice:</strong> For life-threatening emergencies, please call 108 (Ambulance) or visit the nearest hospital immediately.
          </div>
          <div className="alert alert-info">
            <strong>Response Time:</strong> Emergency requests are processed within 30 minutes during business hours.
          </div>
        </div>

        <form className="emergency-form" onSubmit={handleSubmit}>
          <div className="form-section urgent">
            <h3>🩸 Patient Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Patient Name *</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  placeholder="Enter patient's full name"
                />
              </div>
              <div className="form-group">
                <label>Blood Group Required *</label>
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Units Required *</label>
                <input
                  type="number"
                  name="unitsRequired"
                  value={formData.unitsRequired}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                  placeholder="Number of units needed"
                />
              </div>
              <div className="form-group">
                <label>Urgency Level *</label>
                <select name="urgency" value={formData.urgency} onChange={handleChange} required>
                  <option value="high">High - Within 6 hours</option>
                  <option value="critical">Critical - Immediate</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Required By *</label>
              <input
                type="datetime-local"
                name="requiredBy"
                value={formData.requiredBy}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>🏥 Hospital Information</h3>
            <div className="form-group">
              <label>Hospital Name *</label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                required
                placeholder="Name of the hospital"
              />
            </div>

            <div className="form-group">
              <label>Hospital Address *</label>
              <textarea
                name="hospitalAddress"
                value={formData.hospitalAddress}
                onChange={handleChange}
                rows="3"
                required
                placeholder="Complete hospital address"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Hospital Phone *</label>
              <input
                type="tel"
                name="hospitalPhone"
                value={formData.hospitalPhone}
                onChange={handleChange}
                required
                placeholder="Hospital contact number"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>👤 Requester Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="requesterName"
                  value={formData.requesterName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label>Your Phone *</label>
                <input
                  type="tel"
                  name="requesterPhone"
                  value={formData.requesterPhone}
                  onChange={handleChange}
                  required
                  placeholder="Your contact number"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Your Email *</label>
              <input
                type="email"
                name="requesterEmail"
                value={formData.requesterEmail}
                onChange={handleChange}
                required
                placeholder="Your email address"
              />
            </div>

            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Any additional information about the emergency..."
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-emergency"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Request...' : '🚨 Submit Emergency Request'}
            </button>
          </div>
        </form>

        <div className="emergency-contacts">
          <h3>Emergency Contacts</h3>
          <div className="contacts-grid">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h4>National Helpline</h4>
              <p><a href="tel:1075">1075</a></p>
              <span>24/7 Blood Bank Services</span>
            </div>
            <div className="contact-card">
              <div className="contact-icon">🚑</div>
              <h4>Medical Emergency</h4>
              <p><a href="tel:108">108</a></p>
              <span>Ambulance Services</span>
            </div>
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h4>Email Support</h4>
              <p><a href="mailto:emergency@eraktkosh.in">emergency@eraktkosh.in</a></p>
              <span>Emergency Email</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyRequest