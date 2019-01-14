import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import CurrentTemp from './components/CurrentTemp'
import styles from './TemperatureDisplay.module.scss'
import TempMinMax from './components/TempMinMax'

class TemperatureDisplay extends PureComponent {
  render () {
    const { currentWeather } = this.props
    const date = moment.unix(currentWeather['dt']).format('dddd, MMMM Do, YYYY')
    return (
      <div className={`col-sm-6 row middle-xs ${styles.mainContent}`}>
        <h6>{date}</h6>
        <CurrentTemp currentTemp={currentWeather.main.temp} />
        <TempMinMax tempMax={currentWeather.main.temp_max} tempMin={currentWeather.main.temp_min} />
      </div>
    )
  }
}

TemperatureDisplay.propTypes = {
  currentWeather: PropTypes.object
}

export default TemperatureDisplay
