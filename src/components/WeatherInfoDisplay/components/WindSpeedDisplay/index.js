import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import wind from '../../../../assets/wind.svg'

class WindSpeedDisplay extends PureComponent {
  render () {
    const { windSpeed } = this.props
    return (
      <div className='col-sm-6 col-xs-12 row middle-xs details'>
        <div className='col-sm-3 col-xs-5'>
          <img alt='Weather Icon' src={wind} />
        </div>
        <h5 className='col-sm-9 col-xs-7 start-xs'> Wind Speed: {windSpeed} </h5>
      </div>
    )
  }
}

WindSpeedDisplay.propTypes = {
  windSpeed: PropTypes.number
}

export default WindSpeedDisplay
