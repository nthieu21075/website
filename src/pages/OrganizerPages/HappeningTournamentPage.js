import React, { Component } from 'react'
import ListTournamentContainer from 'containers/organizers/tournaments/list/table'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/organizers/global/actions'

class HappeningTournamentPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('happeningTournament'))
  }

  render() {
    return (
      <ListTournamentContainer type='happening' title='Happening Tournament'/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(HappeningTournamentPage)