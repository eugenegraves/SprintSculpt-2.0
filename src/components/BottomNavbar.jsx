import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => {
    // Set initial active tab based on current route
    const path = location.pathname
    if (path.includes('dashboard')) return 'dashboard'
    if (path.includes('add')) return 'add'
    if (path.includes('stats')) return 'stats'
    if (path.includes('profile')) return 'profile'
    return 'dashboard'
  })
  
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    switch(tab) {
      case 'dashboard':
        navigate('/dashboard')
        break
      case 'add':
        navigate('/add')
        break
      case 'stats':
        navigate('/stats')
        break
      case 'profile':
        navigate('/profile')
        break
      default:
        navigate('/dashboard')
    }
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-4">
      <button 
        className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-primary' : 'text-gray-500'}`}
        onClick={() => handleTabChange('dashboard')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-xs mt-1">Home</span>
      </button>
      
      <button 
        className={`flex flex-col items-center ${activeTab === 'add' ? 'text-primary' : 'text-gray-500'}`}
        onClick={() => handleTabChange('add')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-xs mt-1">Add</span>
      </button>
      
      <button 
        className={`flex flex-col items-center ${activeTab === 'stats' ? 'text-primary' : 'text-gray-500'}`}
        onClick={() => handleTabChange('stats')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="text-xs mt-1">Stats</span>
      </button>
      
      <button 
        className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-primary' : 'text-gray-500'}`}
        onClick={() => handleTabChange('profile')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  )
}

export default BottomNavbar 