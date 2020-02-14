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
              let data = {}
              switch(item.status) {
                  case 'approved':
                    data = { icon: 'check', color: 'green', messageStatusText: `was ${item.status}` }
                    break;
                  case 'pending':
                    data = { icon: 'exclamation', color: 'orange', messageStatusText: `is ${item.status}` }
                    break;
                  default:
                    data = { icon: 'close', color: 'red', messageStatusText: `was ${item.status}` }
                }

              return (
                <Timeline.Item
                  color={data.color}
                  key={index}
                >
                  <Icon
                    type={data.icon}
                    style={{ color: data.color }}
                  />
                  {`Your request to join "${item.tournamentName}" ${data.messageStatusText} by organizer at ${moment(item.time).format('DD-MM-YYYY HH:mm')}`}
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