import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class WeatherInfoDisplay extends PureComponent {
  render () {
    const { currentWeather } = this.props
    if (currentWeather != null) {
      return (
        <div className='col-sm-6 row'>
          <div className='col-sm-6'>
            <h6>{currentWeather.dt}</h6>
            <h1>{currentWeather.main.temp}</h1>
            <p>{currentWeather.main.temp_max}</p>
            <p>{currentWeather.main.temp_min}</p>
          </div>
          <div className='col-sm-6'>
            <div>{currentWeather.weather[0].icon}</div>
            <h4>{currentWeather.weather[0].main}</h4>
            <p>{currentWeather.weather[0].description}</p>
          </div>
        </div>
      )
    }
    return 'Please specify a location'
  }
}

WeatherInfoDisplay.propTypes = {
  currentWeather: PropTypes.object
}

export default WeatherInfoDisplay
