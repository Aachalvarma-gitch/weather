import type { RootState } from '../../app/store'

export const selectWeatherState = (state: RootState) => state.weather
