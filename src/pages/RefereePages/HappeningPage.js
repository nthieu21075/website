import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/referees/global/actions'
import MatchesContainer from 'containers/referees/matches'

class HappeningPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('happeningMatch'))
  }

  render() {
    return (
      <MatchesContainer title='Happening Match' type='happeningMatch'/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(HappeningPage)