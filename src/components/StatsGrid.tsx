import type { CurrentWeatherResponse } from '../types/weather'
import { convertTemp, unitSymbol, windDir } from '../utils/helpers'

interface StatsGridProps {
  weather: CurrentWeatherResponse
  unit: 'C' | 'F'
}

export default function StatsGrid({ weather: w, unit }: StatsGridProps) {
  const feelsLike = convertTemp(w.main.feels_like, unit)
  const humidity = w.main.humidity
  const pressure = w.main.pressure
  const windSpeed = w.wind.speed
  const windDeg = w.wind.deg || 0
  const visibility = w.visibility ? (w.visibility / 1000).toFixed(1) : '--'
  const clouds = w.clouds.all

  return (
    <div className="glass-card" style={{ marginTop: '20px' }}>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#f97316' }}>
            🌡️
          </div>
          <div className="stat-value">
            {feelsLike}
            {unitSymbol(unit)}
          </div>
          <div className="stat-label">Feels Like</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#3b82f6' }}>
            💧
          </div>
          <div className="stat-value">{humidity}%</div>
          <div className="stat-label">Humidity</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#a78bfa' }}>
            💨
          </div>
          <div className="stat-value">{(windSpeed * 3.6).toFixed(1)} km/h</div>
          <div className="stat-label">Wind {windDir(windDeg)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#fbbf24' }}>
            ☀️
          </div>
          <div className="stat-value">{pressure} hPa</div>
          <div className="stat-label">Pressure</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#34d399' }}>
            👁️
          </div>
          <div className="stat-value">{visibility} km</div>
          <div className="stat-label">Visibility</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#60a5fa' }}>
            ☁️
          </div>
          <div className="stat-value">{clouds}%</div>
          <div className="stat-label">Cloudiness</div>
        </div>
      </div>
    </div>
  )
}
