import type { CurrentWeatherResponse } from '../types/weather'
import { convertTemp, unitSymbol, formatTime } from '../utils/helpers'

interface CurrentWeatherProps {
  weather: CurrentWeatherResponse
  unit: 'C' | 'F'
}

export default function CurrentWeather({ weather: w, unit }: CurrentWeatherProps) {
  const tz = w.timezone
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const currentTemp = convertTemp(w.main.temp, unit)
  const feelsLike = convertTemp(w.main.feels_like, unit)
  const tempMin = convertTemp(w.main.temp_min, unit)
  const tempMax = convertTemp(w.main.temp_max, unit)

  const icon = w.weather[0].icon
  const main = w.weather[0].main
  const desc = w.weather[0].description
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

  const sunrise = formatTime(w.sys.sunrise, tz)
  const sunset = formatTime(w.sys.sunset, tz)
  const country = w.sys.country || ''

  return (
    <div className="glass-card current-weather">
      <div className="city-name">
        <i className="bi bi-geo-alt-fill"></i>
        {w.name}, {country}
      </div>
      <div className="current-date">
        {dateStr} &middot; {timeStr}
      </div>

      <div className="weather-main">
        <img className="weather-icon-lg" src={iconUrl} alt={main} />
        <div className="temp-display">
          <div className="temp-value">
            {currentTemp}
            <sup>{unitSymbol(unit)}</sup>
          </div>
          <div className="weather-desc">
            {main} &middot; {desc}
          </div>
          <div className="feels-like">
            Feels like {feelsLike}
            {unitSymbol(unit)}
          </div>
          <div className="hilo-temp">
            <span>
              H: {tempMax}
              {unitSymbol(unit)}
            </span>
            <span>
              L: {tempMin}
              {unitSymbol(unit)}
            </span>
          </div>
        </div>
      </div>

      <div className="sun-times" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="sun-item">
          <i className="bi bi-sunrise-fill" style={{ color: '#fbbf24' }}></i>
          <div>
            <div className="sun-label">Sunrise</div>
            <div className="sun-time">{sunrise}</div>
          </div>
        </div>
        <div className="sun-item">
          <i className="bi bi-sunset-fill" style={{ color: '#f97316' }}></i>
          <div>
            <div className="sun-label">Sunset</div>
            <div className="sun-time">{sunset}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
