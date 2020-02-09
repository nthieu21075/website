import React, { Component } from 'react'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'
import moment from 'moment'
import { Row, Col, Layout, Typography, Pagination, Card,Tabs } from 'antd'
import ListTournament from 'components/organizers/tournaments/listTournament'
import MatchDetail from './matchDetail'
import { tournamentData } from 'global/fakeData'
import { getHappeningMatch } from 'services/organizers/tournaments/api'

const { Title } = Typography
const { Content } = Layout
const { TabPane } = Tabs

const contentStyled = {
  padding: 24,
  marginBottom: 24,
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
}

class HappeningMatchContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      data: [],
      showMatchResult: false,
      currentMatchResult: null
    }

    this.closeMatchResult = this.closeMatchResult.bind(this)
    this.matchDetail = this.matchDetail.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const { dispatch, type } = this.props

    dispatch(getHappeningMatch((response) => {
      this.setState({ loading: false, data: response })
    }))
  }

  matchDetail(match) {
    this.setState({ showMatchResult: true, currentMatchResult: match })
  }

  closeMatchResult() {
    this.setState({ showMatchResult: false, currentMatchResult: null })
  }

  render() {
    const { loading, data } = this.state

    return (
      <Content style={contentStyled}>
        <Title level={2} style={{ textAlign: 'center', margin: '30px 0' }}>Happening Match</Title>
          <Row type="flex" justify="center" style={{ background: 'white' }}>
            <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
              { _.map(data, (tournament, tournamentIndex) => {
                return (
                  <TabPane tab={tournament.name} key={tournament.id * 2.9}>
                    { _.map(tournament.tables, (table, index) => {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }} key={index}>
                          <Title level={2} style={{ textAlign: 'center' }}>{table.name}</Title>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            { _.map(table.matches, (match, matchIndex) => {
                              if (!match.visitorTeam || !match.homeTeam) {
                                return (<div/>)
                              }
                              return (
                                <Card
                                  key={match.id * 1.9}
                                  onClick={e=> this.matchDetail(match)}
                                  type="inner"
                                  bodyStyle={{ padding: '15px' }}
                                  style ={{ width: '450px', margin: '0 20px', cursor: 'pointer' }}
                                >
                                  <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, fontWeight: 'bold' }}>{match.name}</div>
                                  <div style={{ textAlign: 'center', fontSize: '15px', marginBottom: 15 }}>{moment(match.scheduled).format('DD-MM-YYYY HH:mm')}</div>
                                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                      <img alt="error" src={process.env.API_DOMAIN_URL + match.homeTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
                                      <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{match.homeTeam.name}</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 10px' }}>
                                      { match.homeScore && match.visitorScore ?
                                        <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{`${match.homeScore} : ${match.visitorScore}`}</div>
                                        : <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>VS</div>
                                      }
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                      <img alt="error" src={process.env.API_DOMAIN_URL + match.visitorTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
                                      <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{match.visitorTeam.name}</div>
                                    </div>
                                  </div>
                                </Card>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </TabPane>
                )
              })}
            </Tabs>
          </Row>
          <MatchDetail
            match={this.state.currentMatchResult}
            visible={this.state.showMatchResult}
            closeModal={this.closeMatchResult}
            getData={this.getData}
          />
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(HappeningMatchContainer)