import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import _ from 'lodash'
import { loadingTourmanetState } from 'services/organizers/tournaments/actions'
import { getSchedule } from 'services/organizers/tournaments/schedule/api'
import SingleEliminationContainer from 'containers/organizers/tournaments/schedules/singleElimination'
import GeneratorContainer from 'containers/organizers/tournaments/schedules/generateForm'

class ScheduleManagementContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
    dispatch(loadingTourmanetState())
    dispatch(getSchedule(params.id))
  }

  render() {
    const { schedules } = this.props

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflow: 'scroll' }}>
        <GeneratorContainer/>
        <SingleEliminationContainer schedules={schedules}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  schedules: state.organizers.tournamentPage.teamManagement.schedules,
  basicInformation: state.organizers.tournamentPage.basicInformation
})

export default connect(mapStateToProps)(ScheduleManagementContainer)
