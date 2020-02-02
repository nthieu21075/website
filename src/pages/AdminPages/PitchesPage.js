import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import PitchesContainer from 'containers/admins/pitches'

class PitchesPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('pitches'))
  }

  render() {
    return (
      <PitchesContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(PitchesPage)