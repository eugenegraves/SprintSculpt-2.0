import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// This is just for development to make testing easier
// This should be removed for production
const isDevelopment = import.meta.env.DEV

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      return setError('Please enter both email and password')
    }
    
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      setError('Failed to log in: ' + error.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleGoogleLogin = async () => {
    try {
      setError('')
      setLoading(true)
      await loginWithGoogle()
      navigate('/dashboard')
    } catch (error) {
      setError('Failed to sign in with Google: ' + error.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleResetPassword = async () => {
    if (!email) {
      return setError('Please enter your email address')
    }
    
    try {
      setError('')
      setLoading(true)
      await resetPassword(email)
      setError('Password reset email sent. Check your inbox.')
    } catch (error) {
      setError('Failed to reset password: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h1>SprintSculpt</h1>
          <p>Track your running performance</p>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            Sign In
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <button 
          onClick={handleGoogleLogin}
          className="google-button"
          disabled={loading}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z" fill="#4285F4"/>
            </g>
          </svg>
          <span>Sign in with Google</span>
        </button>
        
        <div className="footer-links">
          <button 
            onClick={handleResetPassword}
            className="text-button"
            disabled={loading}
          >
            Forgot password?
          </button>
          <Link to="/register">Create account</Link>
        </div>
        
        {/* Development mode quick access - remove for production */}
        {isDevelopment && (
          <div className="dev-mode-container">
            <div className="divider">
              <span>DEVELOPMENT</span>
            </div>
            <button
              onClick={() => {
                setEmail('demo@sprintsculpt.com')
                setPassword('demo1234')
              }}
              className="dev-button"
            >
              Fill Demo Credentials
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login 