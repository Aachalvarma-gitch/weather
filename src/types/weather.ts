export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface MainWeather {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level?: number
  grnd_level?: number
}

export interface Wind {
  speed: number
  deg: number
  gust?: number
}

export interface Clouds {
  all: number
}

export interface SysCurrent {
  type?: number
  id?: number
  country?: string
  sunrise: number
  sunset: number
}

export interface CurrentWeatherResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: WeatherCondition[]
  base: string
  main: MainWeather
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: SysCurrent
  timezone: number
  id: number
  name: string
  cod: number
}

export interface ForecastItem {
  dt: number
  main: MainWeather
  weather: WeatherCondition[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  rain?: {
    '3h': number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

export interface ForecastResponse {
  cod: string
  message: number
  cnt: number
  list: ForecastItem[]
  city: {
    id: number
    name: string
    coord: {
      lon: number
      lat: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface DailyData {
  dt: number
  temps: number[]
  icons: string[]
  descs: string[]
  winds: number[]
  rain: number
  dayName: string
  dateName: string
}

export interface WeatherState {
  city: string
  cityInput: string
  unit: 'C' | 'F'
  loading: boolean
  error: string | null
  weather: CurrentWeatherResponse | null
  forecast: ForecastResponse | null
  cityImage: string | null
  lastData: {
    weather: CurrentWeatherResponse
    forecast: ForecastResponse
    cityImage: string | null
  } | null
}
