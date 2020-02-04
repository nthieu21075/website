import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import PitchDetailContainer from 'containers/admins/pitchDetail'

class PitchDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('pitches'))
  }

  render() {
    const { match: { params } } = this.props

    return (
      <PitchDetailContainer params={params}/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(PitchDetailPage)