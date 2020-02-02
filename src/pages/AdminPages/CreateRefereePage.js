import React, { Component } from 'react'
import CreateRefereeContainer from 'containers/admins/createReferee'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'

class CreateRefereePage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('referees'))
  }

  render() {
    return (
      <CreateRefereeContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(CreateRefereePage)