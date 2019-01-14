import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { groupWeatherByDate } from './util'
import WeatherIcon from '../WeatherInfoDisplay/components/WeatherIcon'
import styles from './ForecastDisplay.module.scss'
import ForecastTemp from './components/ForecastTemp'

class ForecastDisplay extends PureComponent {
  render () {
    const { weatherData, onSelectedDateChange } = this.props
    const dataByDay = groupWeatherByDate({ weatherData })
    return (
      <div className='row maxWidth middle-xs center-xs'>
        {dataByDay.map((eachDay) => {
          const date = moment.unix(eachDay.dt).format('MMM Do')
          return (
            <button
              onClick={() => onSelectedDateChange({ selectedDate: eachDay.dt })}
              className={`col-xs-12 col-sm-2 ${styles.btn}`}
              key={eachDay.dt}>
              <div className={styles.box}>
                <h6>{date}</h6>
                <WeatherIcon weatherTitle={eachDay.weather[0].main} />
                <p>{eachDay.weather[0].main}</p>
                <ForecastTemp eachDayTemp={eachDay.main.temp} />
              </div>
            </button>
          )
        })}
      </div>
    )
  }
}

ForecastDisplay.propTypes = {
  weatherData: PropTypes.array,
  onSelectedDateChange: PropTypes.func
}

export default ForecastDisplay
