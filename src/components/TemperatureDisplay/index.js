import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './TemperatureDisplay.module.scss'
import moment from 'moment'

class TemperatureDisplay extends PureComponent {
  render () {
    const { currentWeather } = this.props
    if (currentWeather !== undefined) {
      const date = moment.unix(currentWeather['dt']).format('dddd, MMMM Do, YYYY h:mm A')
      return (
        <div className={`col-sm-6 row middle-xs ${styles.mainContent}`}>
          <h6>{date}</h6>
          <h1>{Math.round(currentWeather.main.temp * 10) / 10}
            <span className={styles.degree}>
              {`\xB0`}
            </span>
            <span className={styles.unit}>
                F
            </span>
          </h1>
          <p>
            <span className={styles.max}>
                max: {Math.round(currentWeather.main.temp_max * 10) / 10}
              <span className={styles.degree}>
                {`\xB0`}
              </span>
            </span>
            <span className={styles.min}>
                min: {Math.round(currentWeather.main.temp_min * 10) / 10}
              <span className={styles.degree}>
                {`\xB0`}
              </span>
            </span>
          </p>
        </div>
      )
    }
    return 'Please specify a location'
  }
}

TemperatureDisplay.propTypes = {
  currentWeather: PropTypes.object
}

export default TemperatureDisplay
