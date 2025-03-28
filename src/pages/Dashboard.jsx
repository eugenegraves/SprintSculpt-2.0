import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { currentUser } = useAuth()
  
  // Get the user's display name, email, or default to 'Runner'
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Runner'
  
  // Get first letter of first name and last name (or email) for avatar
  const getInitials = () => {
    if (currentUser?.displayName) {
      const names = currentUser.displayName.split(' ')
      if (names.length > 1) {
        return (names[0][0] + names[names.length-1][0]).toUpperCase()
      }
      return currentUser.displayName.substring(0, 2).toUpperCase()
    }
    if (currentUser?.email) {
      return currentUser.email.substring(0, 2).toUpperCase()
    }
    return 'JD' // Default
  }
  
  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: '100m Sprint', date: 'Today', time: '11.24s', improvement: '+0.12s' },
    { id: 2, type: '200m Sprint', date: 'Yesterday', time: '23.45s', improvement: '+0.08s' },
    { id: 3, type: 'Strength Training', date: '2 days ago', time: '45m', improvement: null },
  ]
  
  return (
    <>
      {/* Header with welcome message and profile button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem' 
      }}>
        <div>
          <h1 className="heading-1">Dashboard</h1>
          <p style={{ color: '#6B7280' }}>Welcome back, {displayName}</p>
        </div>
        <Link to="/profile">
          <div style={{ 
            height: '2.5rem', 
            width: '2.5rem', 
            backgroundColor: '#FF6B35', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white' 
          }}>
            <span>{getInitials()}</span>
          </div>
        </Link>
      </div>
      
      {/* Quick stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1rem', 
        marginBottom: '1.5rem' 
      }} className="stats-grid">
        <div className="card" style={{ padding: '1rem', backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Current goal</p>
          <p className="heading-2">100m: 10.8s</p>
          <div style={{ 
            marginTop: '0.5rem', 
            backgroundColor: '#E5E7EB', 
            height: '0.5rem', 
            borderRadius: '9999px', 
            overflow: 'hidden' 
          }}>
            <div style={{ 
              backgroundColor: '#FF6B35', 
              height: '100%', 
              borderRadius: '9999px', 
              width: '65%' 
            }}></div>
          </div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Weekly sessions</p>
          <p className="heading-2">4 / 5</p>
          <div style={{ 
            marginTop: '0.5rem', 
            display: 'flex', 
            gap: '0.25rem' 
          }}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  height: '0.5rem', 
                  flex: 1, 
                  backgroundColor: i < 4 ? '#FF6B35' : '#E5E7EB', 
                  borderRadius: '9999px' 
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Desktop layout for activity and training plan - side by side on larger screens */}
      <div className="dashboard-main-content">
        {/* Recent Activity */}
        <div style={{ marginBottom: '1.5rem' }} className="activity-section">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem' 
          }}>
            <h2 className="heading-2">Recent Activity</h2>
            <Link 
              to="/history" 
              style={{ 
                color: '#FF6B35', 
                fontSize: '0.875rem', 
                textDecoration: 'none' 
              }}
            >
              View all
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentActivities.map(activity => (
              <div 
                key={activity.id} 
                className="card" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '1rem' 
                }}
              >
                <div style={{ 
                  backgroundColor: 'rgba(255, 107, 53, 0.1)', 
                  borderRadius: '50%', 
                  padding: '0.75rem', 
                  marginRight: '1rem' 
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                  }}>
                    <p style={{ fontWeight: '500' }}>{activity.type}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{activity.date}</p>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginTop: '0.25rem' 
                  }}>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{activity.time}</p>
                    {activity.improvement && (
                      <p style={{ fontSize: '0.875rem', color: '#10B981' }}>{activity.improvement}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Training Plan */}
        <div className="plan-section">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem' 
          }}>
            <h2 className="heading-2">Current Plan</h2>
            <Link 
              to="/plans" 
              style={{ 
                color: '#FF6B35', 
                fontSize: '0.875rem', 
                textDecoration: 'none' 
              }}
            >
              View details
            </Link>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <h3 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Sprint Performance Plan</h3>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>Week 3 of 8</p>
            <div style={{ 
              backgroundColor: '#E5E7EB', 
              height: '0.5rem', 
              borderRadius: '9999px', 
              overflow: 'hidden', 
              marginBottom: '1rem' 
            }}>
              <div style={{ 
                backgroundColor: '#FF6B35', 
                height: '100%', 
                borderRadius: '9999px', 
                width: '35%' 
              }}></div>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '0.875rem' 
            }}>
              <p>Today's workout:</p>
              <p style={{ fontWeight: '500' }}>Track Session</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard 