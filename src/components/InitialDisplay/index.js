import React, { PureComponent } from 'react'
import search from '../../assets/searchGif.gif'
import styles from './InitialDisplay.module.scss'

class InitialDisplay extends PureComponent {
  render () {
    return (
      <div className='row center-xs'>
        <div className={styles.initialMsg}>
          <img alt='Search Gif' src={search} />
          <h4 className='col-xs-12'>Please search for a new location or select one of your previous locations to get
            your weather</h4>
        </div>
      </div>
    )
  }
}

export default InitialDisplay

