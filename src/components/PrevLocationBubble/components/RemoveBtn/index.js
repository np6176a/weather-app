import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-icons-kit'
import { x } from 'react-icons-kit/feather/x'
import styles from '../../PrevLocationBubble.module.scss'

class RemoveBtn extends Component {
  render () {
    const { cityId, removeLocation } = this.props
    return (
      <button className={styles.remove} onClick={() => removeLocation({ cityId })}>
        <Icon icon={x} size={10} />
      </button>
    )
  }
}

RemoveBtn.propTypes = {
  cityId: PropTypes.node,
  removeLocation: PropTypes.func
}

export default RemoveBtn
