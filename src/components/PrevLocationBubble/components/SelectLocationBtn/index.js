import React, { Component } from 'react'
import PropTypes from 'prop-types'


class SelectLocationBtn extends Component {
  render () {
    const { onSelectPrevLocation, location } = this.props
    return (
      <button keyname={location.cityId} onClick={onSelectPrevLocation}>
        {location.userInput}
      </button>
    )
  }
}

SelectLocationBtn.propTypes = {
  onSelectPrevLocation: PropTypes.func,
  location: PropTypes.object
}
export default SelectLocationBtn
