import React, { Component } from 'react'
import { Affix } from 'antd'
import SideBar from 'components/organizers/sidebar'
import Navigator from 'helpers/history'
import Routes from 'global/routes'

class SideBarContainer extends Component {
  constructor(props) {
    super(props)
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    console.log(key)
    switch(key) {
      case 'myProfile':
        Navigator.push(Routes.organizers.MY_PROFILE)
        return
      case 'createTournament':
        Navigator.push(Routes.organizers.CREATE_TOURNAMENT)
        return
      default:
        return
    }
  }

  render() {
    return (
      <SideBar onClick={this.onClickMenuItem} />
    )
  }
}

export default SideBarContainer