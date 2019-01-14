import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import WeatherIcon from './components/WeatherIcon'
import HumidityDisplay from './components/HumidityDisplay'
import styles from './WeatherInfoDisplay.module.scss'
import WindSpeedDisplay from './components/WindSpeedDisplay'

class WeatherInfoDisplay extends PureComponent {
  render () {
    const { currentWeather } = this.props
    return (
      <div className='col-sm-6 middle-xs row'>
        <div className='col-xs-3'>
          <WeatherIcon weatherTitle={currentWeather.weather[0].main} />
        </div>
        <div className={`col-xs-9 ${styles.description}`}>
          <h2>{currentWeather.weather[0].main}</h2>
        </div>
        <HumidityDisplay humidity={currentWeather.main.humidity} />
        <WindSpeedDisplay windSpeed={currentWeather.wind.speed} />
      </div>
    )
  }
}

WeatherInfoDisplay.propTypes = {
  currentWeather: PropTypes.object
}

export default WeatherInfoDisplay
