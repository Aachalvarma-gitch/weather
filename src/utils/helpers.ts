export function convertTemp(kelvin: number, unit: 'C' | 'F'): number {
  if (unit === 'F') {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32)
  }
  return Math.round(kelvin - 273.15)
}

export function unitSymbol(unit: 'C' | 'F'): string {
  return unit === 'F' ? '°F' : '°C'
}

export function getDayName(ts: number, tz: number): string {
  const d = new Date((ts + tz) * 1000)
  return d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })
}

export function getDateName(ts: number, tz: number): string {
  const d = new Date((ts + tz) * 1000)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

export function formatTime(unix: number, tz: number): string {
  const d = new Date((unix + tz) * 1000)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
}

export function windDir(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return dirs[Math.round(deg / 22.5) % 16]
}
