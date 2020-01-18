import React, { Component } from 'react'
import HappeningMatchContainer from 'containers/organizers/tournaments/list/happeningMatch'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/organizers/global/actions'

class HappeningMatchPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('happeningMatch'))
  }

  render() {
    return (
      <HappeningMatchContainer type='happening' title='Happening Match'/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(HappeningMatchPage)