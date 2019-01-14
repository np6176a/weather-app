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

const findIcon = (eachDay) => {
  const icon = find(ICON_KEYS, key => eachDay.toLowerCase().includes(key))
  return ICON_MAPPING[icon]
}
class ForecastIcon extends PureComponent {
  render () {
    const { eachDay } = this.props
    const icon = findIcon(eachDay)
    return (
      <img alt='Weather Icon' src={icon} />
    )
  }
}

ForecastIcon.propTypes = {
  eachDay: PropTypes.string
}

export default ForecastIcon
