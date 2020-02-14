import React, { Component } from 'react'
import { Affix } from 'antd'
import { connect } from 'react-redux'
import NavBar from 'components/organizers/nav'
import Notification from 'components/organizers/notification'
import { initAuthState } from 'services/organizers/authentication/actions'
import Navigator from 'helpers/history'
import { fetchOrganizerNotifications } from 'services/notification'
import WebBrowserNotification from 'containers/webNotification'

import _ from 'lodash'

class HeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleNotification: false,
      notifications: [],
      webNotification: {},
      loadData: false
    }
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onCloseNotification = this.onCloseNotification.bind(this)
    this.updateNotification = this.updateNotification.bind(this)
    this.showWebNotification = this.showWebNotification.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchOrganizerNotifications(this.updateNotification, this.showWebNotification))
  }

  onCloseNotification() {
    this.setState({ visibleNotification: false })
  }

  updateNotification(data) {
    this.setState({ notifications: data, loadData: true })
  }

  showWebNotification(item, notification) {
    if (item && !this.state.notifications[item.id] && this.state.loadData) {
      this.setState({ webNotification: notification })
    }
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    console.log(key)
    switch(key) {
      case 'logout':
        this.props.dispatch(initAuthState())
        Navigator.push('/organizer/login')
        return
      case 'notification':
        this.setState({ visibleNotification: true })
        return
      case 'search':
        return
      default:
        Navigator.push('/organizer/login')
        return
    }
  }

  render() {
    return (
      <Affix offsetTop={0}>
        <div>
          <NavBar onClick={this.onClickMenuItem}/>
          <Notification onClose={this.onCloseNotification} visible={this.state.visibleNotification} notifications={_.values(this.state.notifications)}/>
          <WebBrowserNotification webNotification={this.state.webNotification}/>
        </div>
      </Affix>
    )
  }
}

export default connect()(HeaderContainer)