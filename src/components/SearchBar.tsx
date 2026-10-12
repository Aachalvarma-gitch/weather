import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setCityInput, fetchWeather } from '../features/weather/weatherSlice'

export default function SearchBar() {
  const dispatch = useAppDispatch()
  const cityInput = useAppSelector((state) => state.weather.cityInput)

  const handleSearch = () => {
    const city = cityInput.trim()
    if (!city) return
    dispatch(fetchWeather(city))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const quickSearch = (city: string) => {
    dispatch(setCityInput(city))
    dispatch(fetchWeather(city))
  }

  return (
    <div className="glass-card search-section">
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          id="city"
          className="form-control"
          placeholder="Search city..."
          value={cityInput}
          onChange={(e) => dispatch(setCityInput(e.target.value))}
          onKeyPress={handleKeyPress}
          autoComplete="off"
        />
        <button onClick={handleSearch} className="btn btn-search">
          <i className="bi bi-lightning-charge-fill me-1"></i>Search
        </button>
      </div>

      <div className="search-hint">
        <span onClick={() => quickSearch('London')}>London</span>
        <span onClick={() => quickSearch('Tokyo')}>Tokyo</span>
        <span onClick={() => quickSearch('New York')}>New York</span>
        <span onClick={() => quickSearch('Dhaka')}>Dhaka</span>
        <span onClick={() => quickSearch('Paris')}>Paris</span>
        <span onClick={() => quickSearch('Sydney')}>Sydney</span>
      </div>
    </div>
  )
}
