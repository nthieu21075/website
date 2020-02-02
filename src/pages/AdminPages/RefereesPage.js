import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import RefereesContainer from 'containers/admins/referees'

class RefereesPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('referees'))
  }

  render() {
    return (
      <RefereesContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(RefereesPage)