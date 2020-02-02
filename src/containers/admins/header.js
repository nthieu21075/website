import React, { Component } from 'react'
import { Affix } from 'antd'
import { connect } from 'react-redux'
import NavBar from 'components/admins/nav'
import { initAuthState } from 'services/admins/authentication/actions'
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
        Navigator.push('/admins/login')
        return
      default:
        Navigator.push('/admins/login')
        return
    }
  }

  render() {
    return (
      <Affix offsetTop={0}>
        <div>
          <NavBar onClick={this.onClickMenuItem}/>
        </div>
      </Affix>
    )
  }
}

export default connect()(HeaderContainer)