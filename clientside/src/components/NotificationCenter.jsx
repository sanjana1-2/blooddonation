import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './NotificationCenter.css'

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      checkForNewNotifications()
    }, 30000) // Check every 30 seconds

    // Listen for custom events
    window.addEventListener('donorRegistered', handleDonorRegistered)
    window.addEventListener('requestSubmitted', handleRequestSubmitted)

    return () => {
      clearInterval(interval)
      window.removeEventListener('donorRegistered', handleDonorRegistered)
      window.removeEventListener('requestSubmitted', handleRequestSubmitted)
    }
  }, [])

  const handleDonorRegistered = (event) => {
    const donor = event.detail.donor
    addNotification({
      id: Date.now(),
      type: 'success',
      title: 'New Donor Registered',
      message: `${donor.firstName} ${donor.lastName} registered as ${donor.bloodGroup} donor`,
      timestamp: new Date(),
      icon: '👥'
    })
  }

  const handleRequestSubmitted = (event) => {
    const request = event.detail.request
    addNotification({
      id: Date.now(),
      type: 'urgent',
      title: 'Emergency Blood Request',
      message: `${request.bloodGroup} blood needed for ${request.patientName}`,
      timestamp: new Date(),
      icon: '🚨'
    })
  }

  const checkForNewNotifications = () => {
    // Simulate random notifications
    const notificationTypes = [
      {
        type: 'info',
        title: 'Blood Drive Reminder',
        message: 'Blood drive scheduled for tomorrow at City Hospital',
        icon: '📅'
      },
      {
        type: 'warning',
        title: 'Low Blood Stock',
        message: 'O- blood stock running low at AIIMS Blood Bank',
        icon: '⚠️'
      },
      {
        type: 'success',
        title: 'Request Fulfilled',
        message: 'Emergency request for B+ blood has been fulfilled',
        icon: '✅'
      }
    ]

    if (Math.random() > 0.7) { // 30% chance
      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
      addNotification({
        id: Date.now(),
        ...randomNotification,
        timestamp: new Date()
      })
    }
  }

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]) // Keep only 10 notifications
    setUnreadCount(prev => prev + 1)
    
    // Show toast notification
    toast(notification.message, {
      type: notification.type === 'urgent' ? 'error' : notification.type,
      autoClose: 5000
    })
  }

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
    setUnreadCount(0)
  }

  const clearAll = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent': return '#dc3545'
      case 'warning': return '#ffc107'
      case 'success': return '#28a745'
      case 'info': return '#17a2b8'
      default: return '#6c757d'
    }
  }

  return (
    <div className="notification-center">
      <button 
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              <button onClick={markAllAsRead} className="btn-text">
                Mark all read
              </button>
              <button onClick={clearAll} className="btn-text">
                Clear all
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <span className="empty-icon">📭</span>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {notification.icon}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div 
                    className="notification-indicator"
                    style={{ backgroundColor: getNotificationColor(notification.type) }}
                  ></div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationCenter