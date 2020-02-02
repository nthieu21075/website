import React, { Component } from 'react'
import { Affix } from 'antd'
import SideBar from 'components/admins/sidebar'
import Navigator from 'helpers/history'
import Routes from 'global/routes'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'

class SideBarContainer extends Component {
  constructor(props) {
    super(props)
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    this.props.dispatch(updateSideBarActive(key))

    switch(key) {
      case 'organizers':
        Navigator.push(Routes.admins.ORGANIZERS)
        return
      case 'referees':
        Navigator.push(Routes.admins.REFEREES)
        return
      default:
        return
    }
  }

  render() {
    const { global: { sideBarActive } } = this.props

    return (
      <SideBar onClick={this.onClickMenuItem} activeLink={sideBarActive} />
    )
  }
}

const mapStateToProps = (state) => ({
  global: state.admins.global
})

export default connect(mapStateToProps)(SideBarContainer)