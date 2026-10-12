import { useAppSelector } from '../app/hooks'

export default function CityImage() {
  const cityImage = useAppSelector((state) => state.weather.cityImage)
  const city = useAppSelector((state) => state.weather.weather?.name ?? state.weather.cityInput)

  if (!cityImage) return null

  return (
    <div className="glass-card city-image-card">
      <img
        src={cityImage}
        alt={`${city} city view`}
        className="city-image"
        loading="lazy"
      />
    </div>
  )
}
