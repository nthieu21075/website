import React, { Component } from 'react'
import { Drawer, Icon, Timeline } from 'antd'

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
        width={400}
      >
        <Timeline>
          <Timeline.Item color="green"> <Icon type="check" style={{ color: 'green' }} /> Your request to join "Champion Leauge" was approved by organizer at 14-12-2019 05:30</Timeline.Item>
          <Timeline.Item color="green"> <Icon type="check" style={{ color: 'green' }} /> Your request to join "Champion Leauge 1" was approved by organizer at 13-12-2019 05:30</Timeline.Item>
          <Timeline.Item color="red"> <Icon type="close" style={{ color: 'red' }} /> Your request to join "Champion Leauge 2" was canceled by organizer at 12-12-2019 05:30</Timeline.Item>
          <Timeline.Item color="red"> <Icon type="close" style={{ color: 'red' }} /> Your request to join "Champion Leauge 3" was canceled by organizer at 11-12-2019 05:30</Timeline.Item>
          <Timeline.Item color="red"> <Icon type="close" style={{ color: 'red' }} /> Your request to join "Champion Leauge 4" was canceled by organizer at 15-12-2019 05:30</Timeline.Item>
          <Timeline.Item color="green"> <Icon type="check" style={{ color: 'green' }} /> Your request to join "Champion Leauge 5" was approved by organizer at 17-12-2019 05:30</Timeline.Item>
        </Timeline>
      </Drawer>
    )
  }
}

export default Notification