import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import clear from '../../../../assets/clear.svg'
import rain from '../../../../assets/rain.svg'
import snow from '../../../../assets/snow.svg'
import clouds from '../../../../assets/partial.svg'

const ICON_MAPPING = {
  'clear': clear,
  'rain': rain,
  'snow': snow,
  'clouds': clouds
}
const ICON_KEYS = Object.keys(ICON_MAPPING)

const findIcon = (weatherTitle) => {
  const icon = find(ICON_KEYS, key => weatherTitle.toLowerCase().includes(key))
  return ICON_MAPPING[icon]
}
class WeatherIcon extends PureComponent {
  render () {
    const { weatherTitle } = this.props
    const icon = findIcon(weatherTitle)
    return (
      <img className='icon' alt='Weather Icon' src={icon} />
    )
  }
}

WeatherIcon.propTypes = {
  weatherTitle: PropTypes.string
}

export default WeatherIcon
