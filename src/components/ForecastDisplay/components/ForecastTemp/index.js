import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '../../ForecastDisplay.module.scss'

class ForecastTemp extends PureComponent {
  render () {
    const { eachDayTemp } = this.props
    return (
      <h3>{Math.round(eachDayTemp * 10) / 10}
        <span className={styles.degree}>
          {`\xB0`}
        </span>
        <span className={styles.unit}>F</span></h3>
    )
  }
}

ForecastTemp.propTypes = {
  eachDayTemp: PropTypes.node
}

export default ForecastTemp
