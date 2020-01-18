import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import OrganizersContainer from 'containers/admins/organizers'

class OrganizersPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('organizers'))
  }

  render() {
    return (
      <OrganizersContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(OrganizersPage)