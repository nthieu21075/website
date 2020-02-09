import React, { Component } from 'react'
import { Affix } from 'antd'
import SideBar from 'components/referees/sidebar'
import Navigator from 'helpers/history'
import Routes from 'global/routes'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/referees/global/actions'

class SideBarContainer extends Component {
  constructor(props) {
    super(props)
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    this.props.dispatch(updateSideBarActive(key))

    switch(key) {
      case 'invitedMatch':
        Navigator.push(Routes.referee.INVITED_MATCH)
        return
      case 'finishedMatch':
        Navigator.push(Routes.referee.FINISHED_MATCH)
        return
      case 'happeningMatch':
        Navigator.push(Routes.referee.HAPPENING_MATCH)
        return
      case 'profile':
        Navigator.push(Routes.referee.MY_PROFILE)
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
  global: state.referee.global
})

export default connect(mapStateToProps)(SideBarContainer)