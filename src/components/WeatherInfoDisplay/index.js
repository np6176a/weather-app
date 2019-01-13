import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Rain } from '../../assets/rain.svg'

class WeatherInfoDisplay extends PureComponent {
  render () {
    const { currentWeather } = this.props
    if (currentWeather != null) {
      return (
        <div className='col-sm-6 row'>
          <div className='col-xs-12'>
            <img src={Rain} />
            <h4>{currentWeather.weather.main}</h4>
            <p>{currentWeather.weather.description}</p>
          </div>
          <div className='col-sm-6'>
            <h4>{currentWeather.weather.main}</h4>
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
