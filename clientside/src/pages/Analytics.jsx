import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

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

  const getBloodGroupData = () => {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    const counts = bloodGroups.map(group => 
      analyticsData.donors.filter(donor => donor.bloodGroup === group).length
    )

    return {
      labels: bloodGroups,
      datasets: [{
        label: 'Donors',
        data: counts,
        backgroundColor: '#8e1b1b',
        borderRadius: 8
      }]
    }
  }

  const getUrgencyData = () => {
    return {
      labels: ['Low', 'Medium', 'High', 'Critical'],
      datasets: [{
        data: [12, 19, 3, 5],
        backgroundColor: ['#00b894', '#fdcb6e', '#e17055', '#d63031'],
        borderWidth: 0,
        hoverOffset: 10
      }]
    }
  }

  const getMonthlyTrends = () => {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Donations',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: '#8e1b1b',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(142, 27, 27, 0.05)'
        }
      ]
    }
  }

  if (analyticsData.loading) return <div className="analytics">Loading...</div>

  return (
    <motion.div 
      className="analytics"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container">
        <div className="analytics-header">
          <h1>Dashboard</h1>
          <button className="btn btn-primary" onClick={() => window.print()}>Export Report</button>
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
              <p>Active Banks</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{analyticsData.requests.length}</h3>
              <p>Pending Requests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-info">
              <h3>120</h3>
              <p>Lives Saved</p>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Blood Group Distribution</h3>
            <Bar data={getBloodGroupData()} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className="chart-container">
            <h3>Monthly Donation Trend</h3>
            <Line data={getMonthlyTrends()} options={{ responsive: true }} />
          </div>
        </div>

        <div className="detailed-analytics">
          <div className="analytics-section">
            <h3>Insights</h3>
            <div className="insight-card">
              <h4>High Demand Group</h4>
              <p>O- is currently in high demand. 12 requests pending in the last 24 hours.</p>
            </div>
            <div className="insight-card">
              <h4>Donor Growth</h4>
              <p>Donation registrations are up by 15% compared to last month.</p>
            </div>
          </div>

          <div className="analytics-section">
            <h3>System Performance</h3>
            {[
              { label: 'Request Fulfillment', val: '85%' },
              { label: 'Bank Coverage', val: '92%' },
              { label: 'Donor Retention', val: '78%' }
            ].map((m, i) => (
              <div key={i} className="metric-item">
                <div className="metric-label">
                  <span>{m.label}</span>
                  <span>{m.val}</span>
                </div>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: m.val }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Analytics