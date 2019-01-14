import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import wind from '../../../../assets/wind.svg'
import styles from '../../WeatherInfoDisplay.module.scss'

class WindSpeedDisplay extends PureComponent {
  render () {
    const { windSpeed } = this.props
    return (
      <div className={`col-sm-6 row ${styles.details}`}>
        <div className='col-xs-2'>
          <img alt='Weather Icon' src={wind} />
        </div>
        <h4 className='col-xs-10'> Wind Speed: {windSpeed} </h4>
      </div>
    )
  }
}

WindSpeedDisplay.propTypes = {
  windSpeed: PropTypes.number
}

export default WindSpeedDisplay
