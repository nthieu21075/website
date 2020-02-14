import React, { Component } from 'react'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'
import { Row, Col, Layout, Typography, Pagination, Spin } from 'antd'
import ListPendingRequest from 'components/organizers/tournaments/listPendingRequest'
import { tournamentData } from 'global/fakeData'
import { getPendingRequest, approvePendingRequest, unapprovePendingRequest } from 'services/organizers/tournaments/pendingRequest/api'
import { organizerResponseNotification } from 'services/notification'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: 24,
  marginBottom: 24,
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column'
}

class ListPendingRequestContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
    this.approveRequest = this.approveRequest.bind(this)
    this.unapproveRequest = this.unapproveRequest.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getPendingRequest())
  }

  approveRequest(tournamentTeam) {
    this.setState({ loading: true})

    console.log(tournamentTeam.team.onw)

    setTimeout(() => {
      this.props.dispatch(approvePendingRequest(tournamentTeam.id, ()=> {
        this.setState({ loading: false})
        this.props.dispatch(organizerResponseNotification({ userId: tournamentTeam.team.own.id, tournamentName: tournamentTeam.tournament.name, status: 'approved' }))
      }))
    }, 500)
  }

  unapproveRequest(tournamentTeam) {
    this.setState({ loading: true})
    setTimeout(() => {
      this.props.dispatch(unapprovePendingRequest(tournamentTeam.id, ()=> {
        this.setState({ loading: false})
        this.props.dispatch(organizerResponseNotification({ userId: tournamentTeam.team.own.id, tournamentName: tournamentTeam.tournament.name, status: 'cancled' }))
      }))
    }, 500)
  }

  render() {
    const { pendingRequests } = this.props
    let data = pendingRequests.loading ? tournamentData : pendingRequests.data

    return (
      <Spin spinning={this.state.loading} delay={500}>
        <Content style={contentStyled}>
          <Title level={3} style={{ textAlign: 'center', margin: '30px' }}>List Pending Request </Title>
          <Row type="flex" justify="center">
            <Col xs={{span: 23}} md={{span: 22}} sm={{span: 21}} lg={{span: 21}} xl={{span: 21}} style={{ paddingBottom: '100px' }}>
              <ListPendingRequest
                grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2 , xxl: 3}}
                loading={pendingRequests.loading}
                bordered={true}
                data={data}
                approveRequest={this.approveRequest}
                unapproveRequest={this.unapproveRequest}
              />
            </Col>
          </Row>
        </Content>
      </Spin>
    )
  }
}

const mapStateToProps = (state) => ({
  pendingRequests: state.organizers.pendingRequests
})

export default connect(mapStateToProps)(ListPendingRequestContainer)