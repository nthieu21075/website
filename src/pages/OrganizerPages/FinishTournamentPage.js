import React, { Component } from 'react'
import ListTournamentContainer from 'containers/organizers/tournaments/list/table'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/organizers/global/actions'

class FinishTournamentPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('finishTournament'))
  }

  render() {
    return (
      <ListTournamentContainer type='finished' title='Finished Tournament'/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(FinishTournamentPage)