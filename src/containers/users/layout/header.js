import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Affix } from 'antd'
import NavBar from 'components/users/navbar'
import Notification from 'components/users/notification'
import { initAuthState } from 'services/authentication/actions'
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
        Navigator.push('/')
        return
      case 'notification':
        this.setState({ visibleNotification: true })
        return
      case 'profile':
        Navigator.push('/my-profile')
        return
      case 'pitches':
        Navigator.push('/pitches')
        return
      case 'login':
        Navigator.push('/login')
        return
      case 'register':
        Navigator.push('/register')
        return
      case 'logo':
        Navigator.push('/')
        return
      default:
        Navigator.push('/tournaments')
        return
    }
  }

  render() {
    const { authentication } = this.props
    const { logged, user } = authentication

    return (
      <Affix offsetTop={0}>
        <div>
          <NavBar user={user} onClick={this.onClickMenuItem} onClickLogo={this.onClickLogo}/>
          <Notification onClose={this.onCloseNotification} visible={this.state.visibleNotification} />
        </div>
      </Affix>
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.authentication
})

export default connect(mapStateToProps)(HeaderContainer)