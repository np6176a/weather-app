import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import rain from '../../assets/rain.svg'
import styles from './ForecastDisplay.module.scss'
import clear from '../../assets/clear.svg'
import snow from '../../assets/snow.svg'
import clouds from '../../assets/partial.svg'

class ForecastDisplay extends PureComponent {
  render () {
    const { weatherData, onSelectedDateChange } = this.props
    const weather = weatherData.slice(0, 6).map((eachDay) => {
      const date = moment.unix(eachDay['dt']).format('MMM Do')
      return (
        <button
          onClick={() => onSelectedDateChange({ selectedDate: eachDay.dt })}
          className={`col-xs-12 col-sm-2 ${styles.btn}`}
          key={eachDay.dt}>
          <div className={styles.box}>
            <h6>{date}</h6>
            {eachDay.weather[0].main === 'Clear' && <img alt='Weather Icon' src={clear}/>}
            {(eachDay.weather[0].main).includes('Rain') && <img alt='Weather Icon' src={rain}/>}
            {(eachDay.weather[0].main).includes('snow') && <img alt='Weather Icon' src={snow}/>}
            {(eachDay.weather[0].main).includes('Cloud') && <img alt='Weather Icon' src={clouds}/>}
            <p>{eachDay.weather[0].main}</p>
            <h3>70</h3>
          </div>
        </button>
      )
    })
    return (
      <div className='row maxWidth middle-xs'>
        {weather}
      </div>
    )
  }
}

ForecastDisplay.propTypes = {
  weatherData: PropTypes.array,
  onSelectedDateChange: PropTypes.func
}

export default ForecastDisplay
