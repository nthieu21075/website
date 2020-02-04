import React, { Component } from 'react'
import { Affix } from 'antd'
import SideBar from 'components/organizers/sidebar'
import Navigator from 'helpers/history'
import Routes from 'global/routes'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/organizers/global/actions'

class SideBarContainer extends Component {
  constructor(props) {
    super(props)
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    this.props.dispatch(updateSideBarActive(key))

    switch(key) {
      case 'myProfile':
        Navigator.push(Routes.organizers.MY_PROFILE)
        return
      case 'createTournament':
        Navigator.push(Routes.organizers.CREATE_TOURNAMENT)
        return
      case 'unpublishTour':
        Navigator.push(Routes.organizers.TOURNAMENTS)
        return
      case 'requestToJoinTournament':
        Navigator.push(Routes.organizers.PENDING_REQUEST)
        return
      case 'finishTournament':
        Navigator.push(Routes.organizers.FINISHED_TOURNAMENT)
        return
      case 'happeningTournament':
        Navigator.push(Routes.organizers.HAPPENING_TOURNAMENT)
        return
      case 'happeningMatch':
        Navigator.push(Routes.organizers.HAPPENING_MATCH)
        return
      case 'manual':
        Navigator.push(Routes.organizers.MANUAL)
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
  global: state.organizers.global
})

export default connect(mapStateToProps)(SideBarContainer)