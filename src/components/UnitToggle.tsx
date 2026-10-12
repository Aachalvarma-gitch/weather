import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setUnit } from '../features/weather/weatherSlice'

export default function UnitToggle() {
  const dispatch = useAppDispatch()
  const unit = useAppSelector((state) => state.weather.unit)

  return (
    <div className="text-center">
      <div className="unit-toggle">
        <button className={unit === 'C' ? 'active' : ''} onClick={() => dispatch(setUnit('C'))}>
          &deg;C
        </button>
        <button className={unit === 'F' ? 'active' : ''} onClick={() => dispatch(setUnit('F'))}>
          &deg;F
        </button>
      </div>
    </div>
  )
}
