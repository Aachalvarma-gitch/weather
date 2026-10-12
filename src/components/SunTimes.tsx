import type { CurrentWeatherResponse } from '../types/weather'
import { formatTime } from '../utils/helpers'

interface SunTimesProps {
  weather: CurrentWeatherResponse
  tz: number
}

export default function SunTimes({ weather: w, tz }: SunTimesProps) {
  const sunrise = formatTime(w.sys.sunrise, tz)
  const sunset = formatTime(w.sys.sunset, tz)

  return (
    <div className="glass-card" style={{ marginTop: '20px' }}>
      <div className="sun-times">
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
