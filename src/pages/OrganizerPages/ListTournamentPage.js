import React, { Component } from 'react'
import ListTournamentContainer from 'containers/organizers/tournaments/list/table'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/organizers/global/actions'

class ListTournamentPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('unpublishTour'))
  }

  render() {
    return (
      <ListTournamentContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(ListTournamentPage)