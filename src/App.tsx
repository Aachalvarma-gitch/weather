import { Provider } from 'react-redux'
import { store } from './app/store'
import { useAppSelector } from './app/hooks'
import BackgroundBubbles from './components/BackgroundBubbles'
import CityBackground from './components/CityBackground'
import CityImage from './components/CityImage'
import SearchBar from './components/SearchBar'
import UnitToggle from './components/UnitToggle'
import Placeholder from './components/Placeholder'
import Loading from './components/Loading'
import ErrorAlert from './components/ErrorAlert'
import CurrentWeather from './components/CurrentWeather'
import StatsGrid from './components/StatsGrid'
import ForecastScroll from './components/ForecastScroll'
import DailyDetail from './components/DailyDetail'
import './App.css'

function WeatherApp() {
  const { loading, error, weather, forecast, cityInput, unit } = useAppSelector((state) => state.weather)

  return (
    <>
      <CityBackground />
      <BackgroundBubbles />
      <h1 className="hero-title display-6">
        <i className="bi bi-cloud-sun-fill me-2"></i>Weather App
      </h1>
      <p className="hero-subtitle">Real-time weather forecast with 5-day outlook</p>

      <div className="main-container">
        <SearchBar />
        <UnitToggle />
        <CityImage />

        <div id="root">
          {!weather && !loading && !error && <Placeholder />}
          {loading && <Loading city={cityInput.trim() || 'your city'} />}
          {error && <ErrorAlert message={error} />}
          {weather && forecast && !loading && (
            <>
              <CurrentWeather weather={weather} unit={unit} />
              <StatsGrid weather={weather} unit={unit} />
              <ForecastScroll forecast={forecast} unit={unit} tz={weather.timezone} />
              <DailyDetail forecast={forecast} unit={unit} tz={weather.timezone} />
            </>
          )}
        </div>
      </div>

      <div className="footer">Powered by OpenWeatherMap &middot; SKILLHUB</div>
    </>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  )
}
