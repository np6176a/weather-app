import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import humid from '../../../../assets/humidity.svg'
import styles from '../../WeatherInfoDisplay.module.scss'

class HumidityDisplay extends PureComponent {
  render () {
    const { humidity } = this.props
    return (
      <div className={`col-sm-6 row ${styles.details}`}>
        <div className='col-xs-2'>
          <img alt='Weather Icon' src={humid} />
        </div>
        <h4 className='col-xs-10'> Humidity: {humidity} </h4>
      </div>
    )
  }
}

HumidityDisplay.propTypes = {
  humidity: PropTypes.number
}

export default HumidityDisplay
