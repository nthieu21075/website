import React, { Component } from 'react'
import ProfileContainer from 'containers/organizers/profile'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/organizers/global/actions'

class ProfilePage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('myProfile'))
  }

  render() {
    return (
      <ProfileContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(ProfilePage)