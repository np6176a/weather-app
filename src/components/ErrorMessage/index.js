import React, { PureComponent } from 'react'
import styles from './ErrorMessage.module.scss'

class ErrorMessage extends PureComponent {
  render () {
    return (
      <div className='row center-xs'>
        <div className={styles.errorMsg}>
          <h2 className='col-xs-12'>Oops!</h2>
          <h4>Well this is embarrassing. There is a technical issue.</h4>
          <h3>Please Refresh The Page</h3>
        </div>
      </div>
    )
  }
}

export default ErrorMessage

