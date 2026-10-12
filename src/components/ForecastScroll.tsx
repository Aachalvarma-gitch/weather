import type { ForecastResponse, DailyData } from '../types/weather'
import { convertTemp, getDayName, getDateName } from '../utils/helpers'

interface ForecastScrollProps {
  forecast: ForecastResponse
  unit: 'C' | 'F'
  tz: number
}

export default function ForecastScroll({ forecast: f, unit, tz }: ForecastScrollProps) {
  const dailyData: Record<string, DailyData> = {}

  if (f.list) {
    f.list.forEach((item) => {
      const date = new Date((item.dt + tz) * 1000)
      const key = date.toISOString().split('T')[0]
      if (!dailyData[key]) {
        dailyData[key] = {
          dt: item.dt,
          temps: [],
          icons: [],
          descs: [],
          winds: [],
          rain: 0,
          dayName: getDayName(item.dt, tz),
          dateName: getDateName(item.dt, tz),
        }
      }
      dailyData[key].temps.push(item.main.temp)
      dailyData[key].icons.push(item.weather[0].icon)
      dailyData[key].descs.push(item.weather[0].description)
      dailyData[key].winds.push(item.wind.speed)
      dailyData[key].rain += item.rain ? item.rain['3h'] || 0 : 0
    })
  }

  const days = Object.values(dailyData).slice(0, 5)

  return (
    <div className="glass-card" style={{ marginTop: '20px' }}>
      <div className="section-title">
        <i className="bi bi-calendar3"></i> 5-Day Forecast
      </div>
      <div className="forecast-scroll">
        {days.map((day, i) => {
          const hi = convertTemp(Math.max(...day.temps), unit)
          const lo = convertTemp(Math.min(...day.temps), unit)
          const midIcon = day.icons[Math.floor(day.icons.length / 2)]
          const midDesc = day.descs[Math.floor(day.descs.length / 2)]
          const rainMm = day.rain.toFixed(1)
          const isToday = i === 0

          return (
            <div key={keyFromDate(day, i)} className={`forecast-card ${isToday ? 'today-highlight' : ''}`}>
              <div className="forecast-day">{isToday ? 'Today' : day.dayName}</div>
              <img className="forecast-icon" src={`https://openweathermap.org/img/wn/${midIcon}@2x.png`} alt={midDesc} />
              <div className="forecast-temp">
                {hi}&deg; / {lo}&deg;
              </div>
              <div className="forecast-desc">{midDesc}</div>
              {parseFloat(rainMm) > 0 && (
                <div className="forecast-rain">
                  <i className="bi bi-droplet-fill"></i>
                  {rainMm}mm
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function keyFromDate(day: DailyData, i: number) {
  return `${day.dt}-${i}`
}
