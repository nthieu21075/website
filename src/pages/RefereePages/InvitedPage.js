import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/referees/global/actions'
import MatchesContainer from 'containers/referees/matches'

class InvitedPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('invitedMatch'))
  }

  render() {
    return (
      <MatchesContainer title='Unconfirmed Match' type='invitedMatch'/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(InvitedPage)