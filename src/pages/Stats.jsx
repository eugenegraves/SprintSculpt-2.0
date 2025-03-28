import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import BottomNavbar from '../components/BottomNavbar'

const Stats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  
  // Mock data for charts
  const weeklyData = [
    { date: 'Mon', time: 11.2 },
    { date: 'Tue', time: 11.3 },
    { date: 'Wed', time: 0 },
    { date: 'Thu', time: 11.1 },
    { date: 'Fri', time: 0 },
    { date: 'Sat', time: 10.9 },
    { date: 'Sun', time: 0 },
  ]
  
  const monthlyData = [
    { date: 'Week 1', time: 11.3 },
    { date: 'Week 2', time: 11.2 },
    { date: 'Week 3', time: 11.0 },
    { date: 'Week 4', time: 10.9 },
  ]
  
  const yearlyData = [
    { date: 'Jan', time: 11.8 },
    { date: 'Feb', time: 11.6 },
    { date: 'Mar', time: 11.5 },
    { date: 'Apr', time: 11.4 },
    { date: 'May', time: 11.2 },
    { date: 'Jun', time: 11.0 },
    { date: 'Jul', time: 10.9 },
    { date: 'Aug', time: 10.8 },
    { date: 'Sep', time: 0 },
    { date: 'Oct', time: 0 },
    { date: 'Nov', time: 0 },
    { date: 'Dec', time: 0 }
  ]
  
  // Determine which data to show based on selected period
  const getData = () => {
    switch(selectedPeriod) {
      case 'week':
        return weeklyData
      case 'month':
        return monthlyData
      case 'year':
        return yearlyData
      default:
        return weeklyData
    }
  }
  
  // Personal bests
  const personalBests = [
    { distance: '100m', time: '10.8s', date: '2 weeks ago' },
    { distance: '200m', time: '22.4s', date: '1 month ago' },
    { distance: '400m', time: '49.7s', date: '3 months ago' },
    { distance: 'Fly 10m', time: '1.02s', date: '1 week ago' },
  ]
  
  return (
    <div className="mobile-container">
      <div className="page-container pb-20">
        <h1 className="heading-1 mb-6">Performance Analytics</h1>
        
        {/* Period selection */}
        <div className="flex space-x-2 mb-6">
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedPeriod === period
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Performance chart */}
        <div className="card p-4 mb-6">
          <h2 className="heading-2 mb-4">100m Sprint Times</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getData()}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  hide={false}
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#FF6B35" 
                  fill="#FF6B35" 
                  fillOpacity={0.1} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <p className="text-xs text-gray-500">Average</p>
              <p className="font-medium">11.08s</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Best</p>
              <p className="font-medium">10.8s</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Improvement</p>
              <p className="font-medium text-green-600">+0.3s</p>
            </div>
          </div>
        </div>
        
        {/* Personal bests */}
        <div>
          <h2 className="heading-2 mb-4">Personal Bests</h2>
          <div className="space-y-3">
            {personalBests.map(pb => (
              <div key={pb.distance} className="card p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{pb.distance}</p>
                  <p className="text-xs text-gray-500">{pb.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{pb.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavbar />
    </div>
  )
}

export default Stats 