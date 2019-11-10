import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, Tabs, Icon, Layout } from 'antd'
import { initTourmanetState } from 'services/organizers/tournaments/actions'
import { showAlert } from 'helpers/alert'
import BasicInformationContainer from 'containers/organizers/tournaments/basicInformation'
import TeamManagementContainer from 'containers/organizers/tournaments/teamManagement'
import ScheduleManagementContainer from 'containers/organizers/tournaments/scheduleManagement'

const { TabPane } = Tabs
const { Content } = Layout

class TournamentDetailContainner extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(initTourmanetState())
  }

  componentDidUpdate() {
    showAlert(this.props)
  }

  render() {
    const { params, isLoading } = this.props
    return (
      <Spin spinning={false} size='large'>
        <Tabs defaultActiveKey='scheduleManagement'>
          <TabPane tab='Basic Information' key='basicInfo'>
            <BasicInformationContainer params={params}/>
          </TabPane>
          <TabPane tab='Teams Management' key='teamManagement'>
            <TeamManagementContainer params={params}/>
          </TabPane>
          <TabPane tab='Schedule Management' key='scheduleManagement'>
            <ScheduleManagementContainer/>
          </TabPane>
        </Tabs>
      </Spin>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.organizers.tournamentPage.isLoading,
  message: state.organizers.message
})

export default connect(mapStateToProps)(TournamentDetailContainner)