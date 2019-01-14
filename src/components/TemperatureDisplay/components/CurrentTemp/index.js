import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '../../TemperatureDisplay.module.scss'

class CurrentTemp extends PureComponent {
  render () {
    const { currentTemp } = this.props
    return (
      <h1>{Math.round(currentTemp)}
        <span className={styles.degree}>
          {`\xB0`}
        </span>
        <span className={styles.unit}>
                F
        </span>
      </h1>
    )
  }
}

CurrentTemp.propTypes = {
  currentTemp: PropTypes.number
}

export default CurrentTemp
