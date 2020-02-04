import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import OrganizerDetailContainer from 'containers/admins/organizerDetail'

class OrganizerDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('organizers'))
  }

  render() {
    const { match: { params } } = this.props

    return (
      <OrganizerDetailContainer params={params}/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(OrganizerDetailPage)