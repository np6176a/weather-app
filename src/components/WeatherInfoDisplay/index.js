import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import rain from '../../assets/rain.svg'
import clear from '../../assets/clear.svg'
import snow from '../../assets/snow.svg'
import clouds from '../../assets/partial.svg'
import styles from './WeatherInfoDisplay.module.scss'

class WeatherInfoDisplay extends PureComponent {
  render () {
    const { currentWeather } = this.props
    return (
      <div className='col-sm-6 row'>
        <div className='col-xs-2'>
          {currentWeather.weather[0].main === 'Clear' && <img alt='Weather Icon' src={clear}/>}
          {(currentWeather.weather[0].main).includes('Rain') && <img alt='Weather Icon' src={rain}/>}
          {(currentWeather.weather[0].main).includes('snow') && <img alt='Weather Icon' src={snow}/>}
          {(currentWeather.weather[0].main).includes('Cloud') && <img alt='Weather Icon' src={clouds}/>}
        </div>
        <div className={`col-xs-10 ${styles.description}`}>
          <h4>{currentWeather.weather[0].main}</h4>
          <p>{currentWeather.weather[0].description}</p>
        </div>
        <div className='col-sm-6'>
          <h4>Humidity: {currentWeather.main.humidity}</h4>
        </div>
        <div className='col-sm-6'>
          <h4>Wind Speed: {currentWeather.wind.speed}</h4>
        </div>
      </div>
    )
  }
}

WeatherInfoDisplay.propTypes = {
  currentWeather: PropTypes.object
}

export default WeatherInfoDisplay
