import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import humid from '../../../../assets/humidity.svg'

class HumidityDisplay extends PureComponent {
  render () {
    const { humidity } = this.props
    return (
      <div className='col-sm-6 col-xs-12 row middle-xs details'>
        <div className='col-sm-3 col-xs-5'>
          <img alt='Weather Icon' src={humid} />
        </div>
        <h5 className='col-sm-9 col-xs-7 start-xs'> Humidity: {humidity} </h5>
      </div>
    )
  }
}

HumidityDisplay.propTypes = {
  humidity: PropTypes.number
}

export default HumidityDisplay
