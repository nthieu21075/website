import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/referees/global/actions'
import MatchesContainer from 'containers/referees/matches'

class FinishedPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('finishedMatch'))
  }

  render() {
    return (
      <MatchesContainer title='Finished Match' type='finishedMatch'/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(FinishedPage)