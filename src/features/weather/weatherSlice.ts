import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { WeatherState } from '../../types/weather'
import { fetchWeatherData } from '../../api/weatherApi'

const initialState: WeatherState = {
  city: '',
  cityInput: '',
  unit: 'C',
  loading: false,
  error: null,
  weather: null,
  forecast: null,
  cityImage: null,
  lastData: null,
}

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherData(city)
      return data
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Something went wrong. Please try again.')
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCityInput: (state, action: PayloadAction<string>) => {
      state.cityInput = action.payload
    },
    setUnit: (state, action: PayloadAction<'C' | 'F'>) => {
      state.unit = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.city = state.cityInput.trim()
        state.weather = action.payload.weather
        state.forecast = action.payload.forecast
        state.cityImage = action.payload.cityImage
        state.lastData = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.weather = null
        state.forecast = null
        state.cityImage = null
      })
  },
})

export const { setCityInput, setUnit, clearError } = weatherSlice.actions
export default weatherSlice.reducer
