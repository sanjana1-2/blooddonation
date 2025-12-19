import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { bloodBanksAPI } from '../services/api'
import './BloodBanks.css'

const BloodBanks = () => {
  const [searchFilters, setSearchFilters] = useState({
    state: '',
    city: '',
    bloodGroup: ''
  })
  const [bloodBanks, setBloodBanks] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data for demonstration
  const sampleBloodBanks = [
    {
      id: 1,
      name: "All India Institute of Medical Sciences Blood Bank",
      address: "Ansari Nagar, New Delhi - 110029",
      phone: "+91-11-26588500",
      email: "bloodbank@aiims.edu",
      availability: {
        'A+': 25, 'A-': 8, 'B+': 30, 'B-': 5,
        'AB+': 12, 'AB-': 3, 'O+': 40, 'O-': 10
      }
    },
    {
      id: 2,
      name: "Safdarjung Hospital Blood Bank",
      address: "Ansari Nagar West, New Delhi - 110029",
      phone: "+91-11-26165060",
      email: "bloodbank@safdarjung.gov.in",
      availability: {
        'A+': 20, 'A-': 6, 'B+': 25, 'B-': 4,
        'AB+': 10, 'AB-': 2, 'O+': 35, 'O-': 8
      }
    },
    {
      id: 3,
      name: "Red Cross Society Blood Bank",
      address: "Red Cross Road, New Delhi - 110001",
      phone: "+91-11-23711551",
      email: "info@redcrossdelhi.org",
      availability: {
        'A+': 18, 'A-': 5, 'B+': 22, 'B-': 3,
        'AB+': 8, 'AB-': 1, 'O+': 32, 'O-': 7
      }
    }
  ]

  useEffect(() => {
    fetchBloodBanks()
  }, [])

  const fetchBloodBanks = async () => {
    try {
      setLoading(true)
      const response = await bloodBanksAPI.getAll()
      if (response.data.length > 0) {
        setBloodBanks(response.data)
      } else {
        // Use sample data if no data from backend
        setBloodBanks(sampleBloodBanks)
      }
    } catch (error) {
      console.error('Error fetching blood banks:', error)
      // Use sample data as fallback
      setBloodBanks(sampleBloodBanks)
      toast.info('Showing sample data. Backend connection needed for live data.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchFilters.state) params.state = searchFilters.state
      if (searchFilters.city) params.city = searchFilters.city
      if (searchFilters.bloodGroup) params.bloodGroup = searchFilters.bloodGroup

      const response = await bloodBanksAPI.getAll(params)
      if (response.data.length > 0) {
        setBloodBanks(response.data)
      } else {
        // Filter sample data
        let filtered = sampleBloodBanks
        if (searchFilters.bloodGroup) {
          filtered = filtered.filter(bank => 
            bank.availability && bank.availability[searchFilters.bloodGroup] > 0
          )
        }
        setBloodBanks(filtered)
      }
    } catch (error) {
      console.error('Error searching blood banks:', error)
      toast.error('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="blood-banks">
      <div className="container">
        <h1>Find Blood Banks</h1>
        
        <div className="search-section">
          <div className="search-filters">
            <div className="form-group">
              <label>State</label>
              <select name="state" value={searchFilters.state} onChange={handleFilterChange}>
                <option value="">Select State</option>
                <option value="delhi">Delhi</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="karnataka">Karnataka</option>
                <option value="tamil-nadu">Tamil Nadu</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>City</label>
              <select name="city" value={searchFilters.city} onChange={handleFilterChange}>
                <option value="">Select City</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Blood Group</label>
              <select name="bloodGroup" value={searchFilters.bloodGroup} onChange={handleFilterChange}>
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
            
            <button 
              className="btn btn-primary search-btn" 
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        <div className="blood-banks-list">
          {loading ? (
            <div className="loading">Loading blood banks...</div>
          ) : bloodBanks.length === 0 ? (
            <div className="no-results">No blood banks found matching your criteria.</div>
          ) : (
            bloodBanks.map(bank => (
            <div key={bank.id} className="blood-bank-card">
              <div className="bank-info">
                <h3>{bank.name}</h3>
                <p className="address">📍 {bank.address}</p>
                <p className="contact">📞 {bank.phone}</p>
                <p className="email">✉️ {bank.email}</p>
              </div>
              
              <div className="availability">
                <h4>Blood Availability</h4>
                <div className="blood-groups-grid">
                  {Object.entries(bank.availability || bank.bloodInventory || {}).map(([group, units]) => (
                    <div key={group} className={`blood-unit ${units < 10 ? 'low' : units < 20 ? 'medium' : 'high'}`}>
                      <span className="group">{group}</span>
                      <span className="units">{units} units</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bank-actions">
                <button className="btn btn-primary">Contact Bank</button>
                <button className="btn btn-secondary">Get Directions</button>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BloodBanks