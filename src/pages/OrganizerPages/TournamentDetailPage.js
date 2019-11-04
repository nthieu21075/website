import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, Tabs, Icon, Layout } from 'antd'
import BasicInformationContainer from 'containers/organizers/tournaments/basicInformation'

const { TabPane } = Tabs
const { Content } = Layout

const contentStyled = {
  padding: '24px',
  marginBottom: '24px',
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
  background: '#fff'
}

class TournamentDetailPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('page detail did mount')
  }

  componentDidUpdate() {
    console.log(123123123)
  }

  render() {
    const { match: { params }, isLoading } = this.props
    return (
      <Content style={contentStyled}>
        <Spin spinning={isLoading}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Basic Information' key='1'>
              <BasicInformationContainer params={params}/>
            </TabPane>
            <TabPane tab='Teams Management' key='2'>
              Teams Management
            </TabPane>
            <TabPane tab='Schedule Management' key='3'>
              Schedule Management
            </TabPane>
          </Tabs>
        </Spin>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.organizers.tournamentPage.isLoading
})

export default connect(mapStateToProps)(TournamentDetailPage)