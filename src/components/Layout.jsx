import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LogoutButton from './LogoutButton'

/**
 * Layout component that provides consistent structure and navigation
 * for all pages in the application.
 */
const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  
  // Determine active route for navigation highlighting
  const isActive = (path) => {
    return location.pathname === path
  }
  
  // Extract username or email for display
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'
  
  return (
    <>
      {/* Desktop Navigation - visible on larger screens */}
      <div className="desktop-nav">
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>
          SprintSculpt
        </div>
        <div className="desktop-nav-links">
          <Link 
            to="/dashboard" 
            className={`desktop-nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/add" 
            className={`desktop-nav-link ${isActive('/add') ? 'active' : ''}`}
          >
            Add Session
          </Link>
          <Link 
            to="/stats" 
            className={`desktop-nav-link ${isActive('/stats') ? 'active' : ''}`}
          >
            Statistics
          </Link>
          <Link 
            to="/profile" 
            className={`desktop-nav-link ${isActive('/profile') ? 'active' : ''}`}
          >
            Profile
          </Link>
          <div className="user-info">
            <span>{displayName}</span>
            <LogoutButton />
          </div>
        </div>
      </div>
      
      <div className="mobile-container">
        {/* Page content */}
        <div className="page-container">
          {children}
        </div>
        
        {/* Mobile Navigation - visible only on small screens */}
        <div className="mobile-nav">
          <NavButton 
            icon="home" 
            label="Home" 
            isActive={isActive('/dashboard')} 
            onPress={() => navigate('/dashboard')} 
          />
          <NavButton 
            icon="plus" 
            label="Add" 
            isActive={isActive('/add')} 
            onPress={() => navigate('/add')} 
          />
          <NavButton 
            icon="stats" 
            label="Stats" 
            isActive={isActive('/stats')} 
            onPress={() => navigate('/stats')} 
          />
          <NavButton 
            icon="user" 
            label="Profile" 
            isActive={isActive('/profile')} 
            onPress={() => navigate('/profile')} 
          />
        </div>
      </div>
    </>
  )
}

// Helper component for navigation buttons
const NavButton = ({ icon, label, isActive = false, onPress }) => {
  // Render different SVG based on icon type
  const renderIcon = () => {
    switch(icon) {
      case 'home':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        )
      case 'plus':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        )
      case 'stats':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        )
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        )
      default:
        return null
    }
  }
  
  return (
    <button 
      onClick={onPress}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        color: isActive ? 'var(--primary)' : 'var(--gray-500)',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {renderIcon()}
      <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{label}</span>
    </button>
  )
}

export default Layout 