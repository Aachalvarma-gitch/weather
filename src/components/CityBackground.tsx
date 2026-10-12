import { useAppSelector } from '../app/hooks'

export default function CityBackground() {
  const cityImage = useAppSelector((state) => state.weather.cityImage)

  if (!cityImage) return null

  return <div className="city-bg" style={{ backgroundImage: `url(${cityImage})` }} />
}
