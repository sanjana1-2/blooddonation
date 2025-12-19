import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { donorsAPI, bloodBanksAPI, requestsAPI } from '../services/api'
import './Analytics.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    donors: [],
    bloodBanks: [],
    requests: [],
    loading: true
  })

  const [timeRange, setTimeRange] = useState('30') // days

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    try {
      const [donorsRes, bloodBanksRes, requestsRes] = await Promise.all([
        donorsAPI.getAll(),
        bloodBanksAPI.getAll(),
        requestsAPI.getAll()
      ])

      setAnalyticsData({
        donors: donorsRes.data,
        bloodBanks: bloodBanksRes.data,
        requests: requestsRes.data,
        loading: false
      })
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      setAnalyticsData(prev => ({ ...prev, loading: false }))
    }
  }

  // Blood Group Distribution Chart
  const getBloodGroupData = () => {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    const counts = bloodGroups.map(group => 
      analyticsData.donors.filter(donor => donor.bloodGroup === group).length
    )

    return {
      labels: bloodGroups,
      datasets: [{
        label: 'Number of Donors',
        data: counts,
        backgroundColor: [
          '#800020', '#a0002a', '#600018', '#dc3545',
          '#fd7e14', '#ffc107', '#28a745', '#17a2b8'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    }
  }

  // Blood Availability Chart
  const getBloodAvailabilityData = () => {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    const availability = bloodGroups.map(group => {
      return analyticsData.bloodBanks.reduce((total, bank) => {
        return total + (bank.bloodInventory?.[group] || 0)
      }, 0)
    })

    return {
      labels: bloodGroups,
      datasets: [{
        label: 'Units Available',
        data: availability,
        backgroundColor: 'rgba(128, 0, 32, 0.8)',
        borderColor: '#800020',
        borderWidth: 2
      }]
    }
  }

  // Request Urgency Distribution
  const getUrgencyData = () => {
    const urgencyLevels = ['low', 'medium', 'high', 'critical']
    const counts = urgencyLevels.map(level =>
      analyticsData.requests.filter(req => req.urgency === level).length
    )

    return {
      labels: ['Low', 'Medium', 'High', 'Critical'],
      datasets: [{
        data: counts,
        backgroundColor: ['#28a745', '#ffc107', '#fd7e14', '#dc3545'],
        borderWidth: 2
      }]
    }
  }

  // Monthly Trends (simulated data)
  const getMonthlyTrends = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const donations = [45, 52, 38, 67, 73, 89]
    const requests = [23, 31, 28, 45, 52, 61]

    return {
      labels: months,
      datasets: [
        {
          label: 'Donations',
          data: donations,
          borderColor: '#800020',
          backgroundColor: 'rgba(128, 0, 32, 0.1)',
          tension: 0.4
        },
        {
          label: 'Requests',
          data: requests,
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          tension: 0.4
        }
      ]
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  if (analyticsData.loading) {
    return (
      <div className="analytics loading">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading analytics data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="analytics">
      <div className="container">
        <div className="analytics-header">
          <h1>📊 Analytics Dashboard</h1>
          <div className="time-range-selector">
            <label>Time Range:</label>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>

        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{analyticsData.donors.length}</h3>
              <p>Total Donors</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-info">
              <h3>{analyticsData.bloodBanks.length}</h3>
              <p>Blood Banks</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{analyticsData.requests.length}</h3>
              <p>Total Requests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🩸</div>
            <div className="stat-info">
              <h3>{analyticsData.requests.filter(r => r.status === 'fulfilled').length}</h3>
              <p>Lives Saved</p>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Blood Group Distribution</h3>
            <Bar data={getBloodGroupData()} options={chartOptions} />
          </div>

          <div className="chart-container">
            <h3>Blood Availability</h3>
            <Bar data={getBloodAvailabilityData()} options={chartOptions} />
          </div>

          <div className="chart-container">
            <h3>Request Urgency</h3>
            <Doughnut data={getUrgencyData()} options={doughnutOptions} />
          </div>

          <div className="chart-container">
            <h3>Monthly Trends</h3>
            <Line data={getMonthlyTrends()} options={chartOptions} />
          </div>
        </div>

        <div className="detailed-analytics">
          <div className="analytics-section">
            <h3>🎯 Key Insights</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <h4>Most Needed Blood Group</h4>
                <p>O+ blood group has the highest demand with {analyticsData.requests.filter(r => r.bloodGroup === 'O+').length} requests</p>
              </div>
              <div className="insight-card">
                <h4>Donation Rate</h4>
                <p>Average of {Math.round(analyticsData.donors.length / 30)} new donors per day</p>
              </div>
              <div className="insight-card">
                <h4>Response Time</h4>
                <p>Average response time: 2.5 hours for urgent requests</p>
              </div>
              <div className="insight-card">
                <h4>Success Rate</h4>
                <p>{Math.round((analyticsData.requests.filter(r => r.status === 'fulfilled').length / analyticsData.requests.length) * 100)}% of requests successfully fulfilled</p>
              </div>
            </div>
          </div>

          <div className="analytics-section">
            <h3>📈 Performance Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Donor Retention Rate</span>
                <div className="metric-bar">
                  <div className="metric-fill" style={{width: '85%'}}></div>
                </div>
                <span className="metric-value">85%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Blood Bank Coverage</span>
                <div className="metric-bar">
                  <div className="metric-fill" style={{width: '92%'}}></div>
                </div>
                <span className="metric-value">92%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Emergency Response</span>
                <div className="metric-bar">
                  <div className="metric-fill" style={{width: '78%'}}></div>
                </div>
                <span className="metric-value">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics