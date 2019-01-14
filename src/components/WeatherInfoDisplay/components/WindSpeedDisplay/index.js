import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import wind from '../../../../assets/wind.svg'

class WindSpeedDisplay extends PureComponent {
  render () {
    const { windSpeed } = this.props
    return (
      <div className='col-sm-6 row details'>
        <div className='col-xs-3'>
          <img alt='Weather Icon' src={wind} />
        </div>
        <h5 className='col-xs-9'> Wind Speed: {windSpeed} </h5>
      </div>
    )
  }
}

WindSpeedDisplay.propTypes = {
  windSpeed: PropTypes.number
}

export default WindSpeedDisplay
