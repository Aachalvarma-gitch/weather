import type { CurrentWeatherResponse, ForecastResponse } from '../types/weather'

const API_KEY = 'd10cb95e1218d54d7a49c112ee7161ae'

interface WikiSummary {
  originalimage?: { source: string }
  thumbnail?: { source: string }
}

export async function fetchCityImage(city: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}?redirect=true`
    )
    if (!res.ok) return null
    const data = (await res.json()) as WikiSummary
    return data.originalimage?.source ?? data.thumbnail?.source ?? null
  } catch {
    return null
  }
}

export async function fetchWeatherData(city: string): Promise<{
  weather: CurrentWeatherResponse
  forecast: ForecastResponse
  cityImage: string | null
}> {
  const [weatherRes, forecastRes, cityImage] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`),
    fetchCityImage(city)
  ])

  const weather = (await weatherRes.json()) as CurrentWeatherResponse
  const forecast = (await forecastRes.json()) as ForecastResponse

  if (weather.cod !== 200) {
    throw new Error('City not found. Check the spelling and try again.')
  }

  return { weather, forecast, cityImage }
}
