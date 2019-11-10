import React, { Component } from 'react'
import CreateTournamentContainer from 'containers/organizers/createTournament'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/organizers/global/actions'

class CreateTournamentPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('createTournament'))
  }

  render() {
    return (
      <CreateTournamentContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(CreateTournamentPage)