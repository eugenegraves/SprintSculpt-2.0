import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SessionForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: '100m',
    time: '',
    date: new Date().toISOString().split('T')[0],
    weather: 'sunny',
    surface: 'track',
    notes: '',
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would save the data to your backend
    // For now, let's just navigate back to dashboard
    navigate('/dashboard')
  }
  
  const handleSetDistance = (distance) => {
    setFormData({
      ...formData,
      type: distance
    })
  }
  
  return (
    <>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1.5rem' 
      }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{
            marginRight: '1rem',
            color: 'var(--gray-500)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="heading-1">Log Training Session</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          {/* Session Type */}
          <div className="form-field">
            <label className="form-label">Distance</label>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              {['100m', '200m', '400m', 'Fly 10m', 'Strength'].map(distance => (
                <button
                  key={distance}
                  type="button"
                  onClick={() => handleSetDistance(distance)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: formData.type === distance ? 'var(--primary)' : 'var(--gray-100)',
                    color: formData.type === distance ? 'white' : 'var(--gray-700)'
                  }}
                >
                  {distance}
                </button>
              ))}
            </div>
          </div>
          
          {/* Time */}
          <div className="form-field">
            <label htmlFor="time" className="form-label">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              placeholder={formData.type === 'Strength' ? "45m" : "10.87s"}
              value={formData.time}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          {/* Date */}
          <div className="form-field">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          {/* Weather (only for running) */}
          {formData.type !== 'Strength' && (
            <div className="form-field">
              <label htmlFor="weather" className="form-label">Weather Conditions</label>
              <select
                id="weather"
                name="weather"
                value={formData.weather}
                onChange={handleChange}
                className="form-input"
              >
                <option value="sunny">Sunny</option>
                <option value="cloudy">Cloudy</option>
                <option value="rainy">Rainy</option>
                <option value="windy">Windy</option>
                <option value="cold">Cold</option>
                <option value="hot">Hot & Humid</option>
              </select>
            </div>
          )}
          
          {/* Track Surface (only for running) */}
          {formData.type !== 'Strength' && (
            <div className="form-field">
              <label htmlFor="surface" className="form-label">Track Surface</label>
              <select
                id="surface"
                name="surface"
                value={formData.surface}
                onChange={handleChange}
                className="form-input"
              >
                <option value="track">Track</option>
                <option value="grass">Grass</option>
                <option value="turf">Turf</option>
                <option value="road">Road</option>
                <option value="treadmill">Treadmill</option>
              </select>
            </div>
          )}
        </div>
        
        {/* Notes - full width on all screen sizes */}
        <div className="form-field" style={{ marginTop: '1.5rem' }}>
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            placeholder="How did it feel? Any issues?"
            className="form-input"
            style={{ minHeight: '6rem', resize: 'vertical' }}
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <div style={{ marginTop: '1.5rem' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem 0', fontWeight: '500' }}
          >
            Save Session
          </button>
        </div>
      </form>
    </>
  )
}

export default SessionForm 