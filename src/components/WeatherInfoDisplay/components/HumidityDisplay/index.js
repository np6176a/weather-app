import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import humid from '../../../../assets/humidity.svg'

class HumidityDisplay extends PureComponent {
  render () {
    const { humidity } = this.props
    return (
      <div className='col-sm-6 row details'>
        <div className='col-xs-3'>
          <img alt='Weather Icon' src={humid} />
        </div>
        <h5 className='col-xs-9'> Humidity: {humidity} </h5>
      </div>
    )
  }
}

HumidityDisplay.propTypes = {
  humidity: PropTypes.number
}

export default HumidityDisplay
