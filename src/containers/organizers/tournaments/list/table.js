import React, { Component } from 'react'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'
import { Row, Col, Layout, Typography, Pagination } from 'antd'
import ListTournament from 'components/organizers/tournaments/listTournament'
import { tournamentData } from 'global/fakeData'
import { getListTournament } from 'services/organizers/tournaments/api'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: 24,
  marginBottom: 24,
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
}

class ListTournamentContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(getListTournament())
  }

  componentDidUpdate() {
    showAlert(this.props)
  }

  render() {
    const { listTournament } = this.props

    let data = listTournament.loading ? tournamentData : listTournament.data

    return (
      <Content style={contentStyled}>
        <Title level={2} style={{ textAlign: 'center', margin: '30px 0' }}>List Tournament</Title>
        <Row type="flex" justify="center">
          <Col xs={{span: 23}} md={{span: 22}} sm={{span: 21}} lg={{span: 21}} xl={{span: 21}} style={{ paddingBottom: '100px' }}>
            <ListTournament
              grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2 , xxl: 3}}
              loading={listTournament.loading}
              bordered={true}
              data={data}
            />
          </Col>
        </Row>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  message: state.organizers.message,
  listTournament: state.organizers.tournamentPage.listTournament
})

export default connect(mapStateToProps)(ListTournamentContainer)