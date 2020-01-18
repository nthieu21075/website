import React, { Component } from 'react'
import CreateOrganizerContainer from 'containers/admins/createOrganizer'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'

class CreateOrganizerPage extends Component {
  render() {
    return (
      <CreateOrganizerContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(CreateOrganizerPage)