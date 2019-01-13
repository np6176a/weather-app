import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-icons-kit'
import { x } from 'react-icons-kit/feather/x'
import styles from './PrevLocationBubble.module.scss'

class PrevLocationBubble extends Component {
  render () {
    const { allLocations, onSelectPrevLocation, removeLocation } = this.props
    const previousLocations = allLocations.map((loc) => {
      return (
        <li className={styles.bubble} key={loc.userInput}>
          <button keyname={loc.cityId} onClick={onSelectPrevLocation}>
            {loc.userInput}
          </button>
          <button className={styles.remove} onClick={() => removeLocation({ cityId: loc.cityId })}>
            <Icon icon={x} size={10} />
          </button>
        </li>
      )
    })
    return (
      <div className='row center-xs'>
        <ul className='col-xs-12'>
          { previousLocations }
        </ul>
      </div>
    )
  }
}

PrevLocationBubble.propTypes = {
  allLocations: PropTypes.array,
  onSelectPrevLocation: PropTypes.func,
  removeLocation: PropTypes.func
}

export default PrevLocationBubble
