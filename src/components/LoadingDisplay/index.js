import React, { PureComponent } from 'react'
import loading from '../../assets/loading.gif'
import styles from './LoadingDisplay.module.scss'

class LoadingDisplay extends PureComponent {
  render () {
    return (
      <div className={styles.loadDisplay}>
        <div className={styles.wrap}>
          <img alt='Search Gif' src={loading} />
          <h4>Loading</h4>
        </div>
      </div>
    )
  }
}

export default LoadingDisplay
