import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '../../TemperatureDisplay.module.scss'

class TempMinMax extends PureComponent {
  render () {
    const { tempMin, tempMax } = this.props
    return (
      <p>
        <span className={styles.max}>
                max: {Math.round(tempMax)}
          <span className={styles.degree}>
            {`\xB0`}
          </span>
        </span>
        <span className={styles.min}>
                min: {Math.round(tempMin)}
          <span className={styles.degree}>
            {`\xB0`}
          </span>
        </span>
      </p>
    )
  }
}

TempMinMax.propTypes = {
  tempMin: PropTypes.number,
  tempMax: PropTypes.number
}

export default TempMinMax
