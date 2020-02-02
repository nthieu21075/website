import React, { Component } from 'react'
import CreatePitchContainer from 'containers/admins/createPitch'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'

class CreatePitchPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('pitches'))
  }

  render() {
    return (
      <CreatePitchContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(CreatePitchPage)