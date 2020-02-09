import React, { Component } from 'react'
import ProfileContainer from 'containers/referees/profile'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/referees/global/actions'

class ProfilePage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('profile'))
  }

  render() {
    return (
      <ProfileContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(ProfilePage)