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

  render() {
    const { params, isLoading } = this.props
    return (
      <Spin spinning={false} size='large'>
        <Tabs defaultActiveKey='basicInfo'>
          <TabPane tab='Basic Information' key='basicInfo'>
            <BasicInformationContainer params={params}/>
          </TabPane>
          <TabPane tab='Teams Management' key='teamManagement'>
            <TeamManagementContainer params={params}/>
          </TabPane>
          <TabPane tab='Schedule Management' key='scheduleManagement'>
            <ScheduleManagementContainer params={params}/>
          </TabPane>
        </Tabs>
      </Spin>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.organizers.tournamentPage.isLoading
})

export default connect(mapStateToProps)(TournamentDetailContainner)