import React, { Component } from 'react'
import { Affix } from 'antd'
import { connect } from 'react-redux'
import NavBar from 'components/organizers/nav'
import Notification from 'components/organizers/notification'
import { initAuthState } from 'services/organizers/authentication/actions'
import Navigator from 'helpers/history'

class HeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { visibleNotification: false }
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onCloseNotification = this.onCloseNotification.bind(this)
  }

  onCloseNotification() {
    this.setState({ visibleNotification: false })
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    console.log(key)
    switch(key) {
      case 'logout':
        this.props.dispatch(initAuthState())
        Navigator.push('/login')
        return
      case 'notification':
        this.setState({ visibleNotification: true })
        return
      case 'search':
        return
      default:
        Navigator.push('/login')
        return
    }
  }

  render() {
    return (
      <Affix offsetTop={0}>
        <div>
          <NavBar onClick={this.onClickMenuItem}/>
          <Notification onClose={this.onCloseNotification} visible={this.state.visibleNotification} />
        </div>
      </Affix>
    )
  }
}

export default connect()(HeaderContainer)