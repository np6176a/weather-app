import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/feather/search'
import styles from './LocationInput.module.scss'

class LocationInput extends Component {
  render () {
    const { onLocationChange, onSelectPrevLocation, allLocations } = this.props
    const previousLocations = allLocations.map((loc) => {
      return (
        <li key={loc.userInput}>
          <button keyname={loc.cityId} onClick={onSelectPrevLocation}>
            {loc.userInput}
          </button>
        </li>
      )
    })
    //onclick of button update value of input
    //then run onselect func
    return (
      <form className='row center-xs' onSubmit={onLocationChange}>
        <div className='col-xs-12'>
          <div className={styles.locationInputContainer}>
            <input
              className={styles.locationInput}
              type='text'
              name='userInput'
              placeholder='Search' />
            <span className={styles.searchIcon}>
              <Icon icon={search} size={20} />
            </span>
          </div>
          <ul className={styles.locationListBox}>
            {previousLocations}
          </ul>
        </div>
      </form>
    )
  }
}

LocationInput.propTypes = {
  onLocationChange: PropTypes.func,
  onSelectPrevLocation: PropTypes.func,
  allLocations: PropTypes.array
}

export default LocationInput
