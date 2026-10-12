interface LoadingProps {
  city: string
}

export default function Loading({ city }: LoadingProps) {
  return (
    <div className="glass-card loading-spinner">
      <div className="spinner"></div>
      <p>Fetching weather data for "{city}"...</p>
    </div>
  )
}
