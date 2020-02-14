import React, { Component } from 'react'
import { Drawer, Icon, Timeline } from 'antd'
import moment from 'moment'
import _ from 'lodash'

class Notification extends Component {
  render() {
    const { onClose, visible, notifications } = this.props

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
          {
            _.reverse(_.sortBy(notifications, [function(o) { return o.time }])).map((item, index) => {
              return (
                <Timeline.Item
                  color='orange'
                  key={index}
                >
                  <Icon
                    type='exclamation'
                    style={{ color: 'orange' }}
                  />
                  {`Your have new request to join "${item.tournamentName}" from ${item.userName} at ${moment(item.time).format('DD-MM-YYYY HH:mm')}`}
                </Timeline.Item>
              )
            })
          }
        </Timeline>
      </Drawer>
    )
  }
}

export default Notification