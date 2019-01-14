import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RemoveBtn from './components/RemoveBtn'
import styles from './PrevLocationBubble.module.scss'
import SelectLocationBtn from './components/SelectLocationBtn'

class PrevLocationBubble extends Component {
  render () {
    const { allLocations, onSelectPrevLocation, removeLocation } = this.props
    return (
      <div className='row center-xs'>
        <ul className='col-xs-12'>
          {
            allLocations.map((loc) => {
              return (
                <li className={styles.bubble} key={loc.userInput}>
                  <SelectLocationBtn onSelectPrevLocation={onSelectPrevLocation} location={loc} />
                  <RemoveBtn removeLocation={removeLocation} cityId={loc.cityId} />
                </li>
              )
            })
          }
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
