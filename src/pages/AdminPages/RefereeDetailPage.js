import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import RefereeDetailContainer from 'containers/admins/refereeDetail'

class RefereeDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('referees'))
  }

  render() {
    const { match: { params } } = this.props

    return (
      <RefereeDetailContainer params={params}/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(RefereeDetailPage)