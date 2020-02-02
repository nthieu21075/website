import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import ManualContainer from 'containers/admins/manual'

class ManualPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('manual'))
  }

  render() {
    return (
      <ManualContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(ManualPage)