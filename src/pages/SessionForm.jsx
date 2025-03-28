import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SessionForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: 'Sprint',
    date: new Date().toISOString().split('T')[0],
    weather: 'sunny',
    surface: 'track',
    notes: '',
  })
  
  const commonDistances = ['10m', '20m', '30m', '40m', '60m', '100m', '150m', '200m', '300m', '400m']
  
  const [sets, setSets] = useState([
    { 
      id: 1, 
      reps: 1, 
      distance: '30m',
      customDistance: '',
      times: [''],
      noTimeTracking: false
    }
  ])
  
  const [newCustomDistance, setNewCustomDistance] = useState('')
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const sessionData = {
      ...formData,
      sets: sets.map(set => ({
        ...set,
        distance: set.customDistance || set.distance,
        times: set.noTimeTracking ? [] : set.times.filter(time => time.trim() !== '')
      }))
    }
    
    console.log('Form submitted:', sessionData)
    navigate('/dashboard')
  }
  
  const addSet = () => {
    const newSet = {
      id: sets.length + 1,
      reps: 1,
      distance: '30m',
      customDistance: '',
      times: [''],
      noTimeTracking: false
    }
    setSets([...sets, newSet])
  }
  
  const removeSet = (setId) => {
    setSets(sets.filter(set => set.id !== setId))
  }
  
  const handleSetChange = (setId, field, value) => {
    setSets(sets.map(set => {
      if (set.id === setId) {
        if (field === 'reps') {
          const numReps = parseInt(value, 10) || 0
          const newTimes = [...set.times]
          
          if (numReps > set.times.length) {
            for (let i = set.times.length; i < numReps; i++) {
              newTimes.push('')
            }
          } else if (numReps < set.times.length) {
            newTimes.splice(numReps)
          }
          
          return { ...set, [field]: value, times: newTimes }
        }
        
        return { ...set, [field]: value }
      }
      return set
    }))
  }
  
  const handleTimeChange = (setId, repIndex, value) => {
    setSets(sets.map(set => {
      if (set.id === setId) {
        const newTimes = [...set.times]
        newTimes[repIndex] = value
        return { ...set, times: newTimes }
      }
      return set
    }))
  }
  
  const toggleTimeTracking = (setId) => {
    setSets(sets.map(set => {
      if (set.id === setId) {
        return { ...set, noTimeTracking: !set.noTimeTracking }
      }
      return set
    }))
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
          <div className="form-field">
            <label className="form-label">Session Type</label>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              {['Sprint', 'Technique', 'Strength', 'Recovery'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: formData.type === type ? 'var(--primary)' : 'var(--gray-100)',
                    color: formData.type === type ? 'white' : 'var(--gray-700)'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
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
        
        <div className="sets-container">
          <div className="sets-header">
            <h2 className="heading-2">Training Sets</h2>
            <button 
              type="button" 
              onClick={addSet}
              className="add-set-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Set
            </button>
          </div>
          
          {sets.map((set, setIndex) => (
            <div key={set.id} className="set-card">
              <div className="set-header">
                <h3>Set {setIndex + 1}</h3>
                {sets.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeSet(set.id)}
                    className="remove-set-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Remove
                  </button>
                )}
              </div>
              
              <div className="set-form-row">
                <div className="form-field">
                  <label className="form-label">Reps</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={set.reps}
                    onChange={(e) => handleSetChange(set.id, 'reps', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Distance</label>
                  <div className="distance-inputs">
                    <select
                      value={set.distance}
                      onChange={(e) => handleSetChange(set.id, 'distance', e.target.value)}
                      className="form-input"
                      disabled={!!set.customDistance}
                    >
                      {commonDistances.map(dist => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                    
                    <div className="or-divider">or</div>
                    
                    <input
                      type="text"
                      placeholder="Custom (e.g. 25m)"
                      value={set.customDistance}
                      onChange={(e) => handleSetChange(set.id, 'customDistance', e.target.value)}
                      className="form-input"
                    />
                    
                    {set.customDistance && (
                      <button
                        type="button"
                        onClick={() => handleSetChange(set.id, 'customDistance', '')}
                        className="text-button"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="time-tracking-section">
                <div className="time-tracking-header">
                  <label className="form-label">Time Tracking</label>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id={`no-time-${set.id}`}
                      checked={set.noTimeTracking}
                      onChange={() => toggleTimeTracking(set.id)}
                    />
                    <label htmlFor={`no-time-${set.id}`}>No time tracking for this set</label>
                  </div>
                </div>
                
                {!set.noTimeTracking && (
                  <div className="times-container">
                    {Array.from({ length: set.reps }, (_, i) => (
                      <div key={i} className="time-input-row">
                        <label className="form-label">Rep {i + 1}</label>
                        <input
                          type="text"
                          placeholder={formData.type === 'Strength' ? "1m 30s" : "10.87s"}
                          value={set.times[i] || ''}
                          onChange={(e) => handleTimeChange(set.id, i, e.target.value)}
                          className="form-input"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
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