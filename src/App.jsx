import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './styles.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SessionForm from './pages/SessionForm'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  // Add a loading state to prevent flashing of login/dashboard screens
  useEffect(() => {
    setIsLoading(false)
  }, [currentUser])

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <p>Loading SprintSculpt...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/login" 
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        } 
      />
      <Route 
        path="/register" 
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Register />
          )
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          currentUser ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/add" 
        element={
          currentUser ? (
            <Layout>
              <SessionForm />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/stats" 
        element={
          currentUser ? (
            <Layout>
              <div className="page-container">
                <h1 className="heading-1">Statistics</h1>
                <p>Statistics page coming soon!</p>
              </div>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/profile" 
        element={
          currentUser ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
    </Routes>
  )
}

export default App
