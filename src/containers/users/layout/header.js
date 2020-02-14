import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Affix } from 'antd'
import NavBar from 'components/users/navbar'
import Notification from 'components/users/notification'
import { initAuthState } from 'services/users/authentication/actions'
import Navigator from 'helpers/history'
import { getCategories } from 'services/users/category/api'
import { fetchUserNotifications } from 'services/notification'
import { userTeam } from 'services/users/tournaments/api'
import WebBrowserNotification from 'containers/webNotification'

import CreateTeamDrawer from 'containers/users/profile/createTeam'
import _ from 'lodash'

class HeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleNotification: false,
      createTeam: false,
      notifications: [],
      webNotification: {},
      loadData: false
    }
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onCloseNotification = this.onCloseNotification.bind(this)
    this.onCloseCreateTeam = this.onCloseCreateTeam.bind(this)
    this.updateNotification = this.updateNotification.bind(this)
    this.showWebNotification = this.showWebNotification.bind(this)
    this.onCloseCreateTeam = this.onCloseCreateTeam.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getCategories())
    this.props.dispatch(fetchUserNotifications(this.updateNotification, this.showWebNotification))
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

  onCloseCreateTeam() {
    this.setState({ createTeam: false })
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    if (_.includes(key, 'categoryItem')) {
      Navigator.push('/tournaments/' + item.props.id)
      return
    }

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
      case 'createTeam':
        this.setState({ createTeam: true })
        return
      case 'search':
        return
      default:
        Navigator.push('/tournaments')
        return
    }
  }

  render() {
    const { authentication, categories } = this.props
    const { logged, data } = authentication

    return (
      <Affix offsetTop={0}>
        <div>
          <NavBar user={data} onClick={this.onClickMenuItem} onClickLogo={this.onClickLogo} categories={categories} />
          <Notification onClose={this.onCloseNotification} visible={this.state.visibleNotification} notifications={_.values(this.state.notifications)} />
          <CreateTeamDrawer onClose={this.onCloseCreateTeam} visible={this.state.createTeam}/>
          <WebBrowserNotification webNotification={this.state.webNotification}/>
        </div>
      </Affix>
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.users.auth,
  categories: state.users.categories
})

export default connect(mapStateToProps)(HeaderContainer)