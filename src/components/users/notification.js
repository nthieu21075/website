import React, { Component } from 'react'
import { Drawer } from 'antd'

class Notification extends Component {
  render() {
    const { onClose, visible } = this.props

    return (
      <Drawer
        title="Notification"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Notification 1</p>
        <p>Notification 2</p>
        <p>Notification 3</p>
      </Drawer>
    )
  }
}

export default Notification