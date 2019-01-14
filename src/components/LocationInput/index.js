import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/feather/search'
import styles from './LocationInput.module.scss'

class LocationInput extends Component {
  render () {
    const { onLocationChange, userInput, onUserInputChange, invalidLocation } = this.props
    return (
      <form className='row center-xs' onSubmit={onLocationChange}>
        <div className='col-xs-12'>
          <div className={styles.locationInputContainer}>
            <input
              className={styles.locationInput}
              type='text'
              name='userInput'
              value={userInput}
              onChange={onUserInputChange}
              placeholder='Search' />
            <span className={styles.searchIcon}>
              <Icon icon={search} size={20} />
            </span>
            {invalidLocation && <p>Invalid Location</p>}
          </div>
        </div>
      </form>
    )
  }
}

LocationInput.propTypes = {
  invalidLocation: PropTypes.bool,
  onLocationChange: PropTypes.func,
  onUserInputChange: PropTypes.func,
  userInput: PropTypes.string
}

export default LocationInput
