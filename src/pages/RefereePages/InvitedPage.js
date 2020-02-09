import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/referees/global/actions'
import InvitedMatchContainer from 'containers/referees/invitedMatch'

class InvitedPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('invitedMatch'))
  }

  render() {
    const { match: { params } } = this.props

    return (
      <InvitedMatchContainer params={params}/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(InvitedPage)