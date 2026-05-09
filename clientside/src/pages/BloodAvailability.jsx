import React, { useState } from 'react'
import './BloodAvailability.css'

const BloodAvailability = () => {
  const [searchParams, setSearchParams] = useState({
    state: '',
    district: '',
    bloodGroup: ''
  })

  const availabilityData = [
    {
      state: 'Delhi',
      district: 'Central Delhi',
      bloodGroup: 'A+',
      totalUnits: 245,
      availableUnits: 180,
      bloodBanks: [
        { name: 'AIIMS Blood Bank', units: 80 },
        { name: 'Safdarjung Hospital', units: 60 },
        { name: 'Red Cross Society', units: 40 }
      ]
    },
    {
      state: 'Delhi',
      district: 'South Delhi',
      bloodGroup: 'O+',
      totalUnits: 320,
      availableUnits: 280,
      bloodBanks: [
        { name: 'Max Hospital', units: 120 },
        { name: 'Apollo Hospital', units: 100 },
        { name: 'Fortis Hospital', units: 60 }
      ]
    },
    {
      state: 'Maharashtra',
      district: 'Mumbai',
      bloodGroup: 'B+',
      totalUnits: 180,
      availableUnits: 120,
      bloodBanks: [
        { name: 'Tata Memorial Hospital', units: 70 },
        { name: 'KEM Hospital', units: 50 }
      ]
    }
  ]

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    })
  }

  const getAvailabilityStatus = (available, total) => {
    const percentage = (available / total) * 100
    if (percentage >= 70) return 'high'
    if (percentage >= 40) return 'medium'
    return 'low'
  }

  return (
    <div className="blood-availability">
      <div className="container">
        <div className="page-header">
          <h1>Blood Availability</h1>
          <p>Check real-time blood availability across blood banks</p>
        </div>

        <div className="search-section">
          <div className="search-form">
            <div className="form-group">
              <label>State</label>
              <select name="state" value={searchParams.state} onChange={handleInputChange}>
                <option value="">All States</option>
                <option value="delhi">Delhi</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="karnataka">Karnataka</option>
                <option value="tamil-nadu">Tamil Nadu</option>
              </select>
            </div>

            <div className="form-group">
              <label>District</label>
              <select name="district" value={searchParams.district} onChange={handleInputChange}>
                <option value="">All Districts</option>
                <option value="central-delhi">Central Delhi</option>
                <option value="south-delhi">South Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="pune">Pune</option>
              </select>
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select name="bloodGroup" value={searchParams.bloodGroup} onChange={handleInputChange}>
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

            <button className="btn btn-primary">Search</button>
          </div>
        </div>

        <div className="availability-summary">
          <div className="summary-cards">
            <div className="summary-card high">
              <div className="card-icon">🟢</div>
              <div className="card-content">
                <h3>High Availability</h3>
                <p>70%+ stock available</p>
                <span className="count">12 locations</span>
              </div>
            </div>
            <div className="summary-card medium">
              <div className="card-icon">🟡</div>
              <div className="card-content">
                <h3>Medium Availability</h3>
                <p>40-70% stock available</p>
                <span className="count">8 locations</span>
              </div>
            </div>
            <div className="summary-card low">
              <div className="card-icon">🔴</div>
              <div className="card-content">
                <h3>Low Availability</h3>
                <p>Below 40% stock</p>
                <span className="count">5 locations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="availability-results">
          <h2>Blood Availability Results</h2>
          <div className="results-list">
            {availabilityData.map((item, index) => (
              <div key={index} className="availability-card">
                <div className="card-header">
                  <div className="location-info">
                    <h3>{item.state} - {item.district}</h3>
                    <div className="blood-group-badge">{item.bloodGroup}</div>
                  </div>
                  <div className={`availability-status ${getAvailabilityStatus(item.availableUnits, item.totalUnits)}`}>
                    <span className="units">{item.availableUnits}/{item.totalUnits} units</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${(item.availableUnits / item.totalUnits) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="blood-banks-breakdown">
                  <h4>Available at Blood Banks:</h4>
                  <div className="banks-list">
                    {item.bloodBanks.map((bank, bankIndex) => (
                      <div key={bankIndex} className="bank-item">
                        <span className="bank-name">{bank.name}</span>
                        <span className="bank-units">{bank.units} units</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn btn-primary">Request Blood</button>
                  <button className="btn btn-secondary">Contact Banks</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="emergency-section">
          <div className="emergency-card">
            <div className="emergency-icon">🚨</div>
            <div className="emergency-content">
              <h3>Emergency Blood Request</h3>
              <p>Need blood urgently? Submit an emergency request for immediate assistance.</p>
              <button className="btn btn-danger">Submit Emergency Request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BloodAvailability