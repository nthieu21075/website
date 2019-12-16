import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/organizers/global/actions'
import ListPendingRequestContainer from 'containers/organizers/tournaments/pendingRequest'

class PendingRequestPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('requestToJoinTournament'))
  }

  render() {
    return (
      <ListPendingRequestContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(PendingRequestPage)