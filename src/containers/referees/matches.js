import React, { Component } from 'react'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'
import moment from 'moment'
import { Row, Col, Layout, Typography, Pagination, Card,Tabs } from 'antd'
import MatchDetail from './matchDetail'
import { getInvitedMatch } from 'services/referees/api'

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

class InvitedMatchContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      data: [],
      showMatchResult: false,
      currentMatchResult: null,
      currentTournament: null
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

    dispatch(getInvitedMatch(type, (response) => {
      this.setState({ loading: false, data: response })
    }))
  }

  matchDetail(match, tournament) {
    this.setState({ showMatchResult: true, currentMatchResult: match, currentTournament: tournament })
  }

  closeMatchResult() {
    this.setState({ currentTournament: null, showMatchResult: false, currentMatchResult: null })
  }

  render() {
    const { loading, data } = this.state
    const { title } = this.props
    return (
      <Content style={contentStyled}>
        <Title level={2} style={{ textAlign: 'center', margin: '30px 0' }}>{title}</Title>
        <Row type="flex" justify="center" style={{ background: 'white', flexDirection: 'column' }}>
          {
            data.map((tournament, index) =>{
              return (
                <Row type="flex" justify="center" style={{ background: 'white', flexDirection: 'column' }} key={index}>
                  <Title level={4} style={{ textAlign: 'center', margin: '30px 0' }}>{tournament.name}</Title>
                  <div style={{ display: 'flex', background: 'white', flexFlow: 'wrap row', width: '100%' }}>
                      { _.map(tournament.tables, (table, index) => {
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', margin: '20px', width: '100%' }} key={index}>
                            <Title level={4} style={{ textAlign: 'center' }}>{table.name}</Title>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'wrap row' }}>
                              { _.map(table.matches, (match, matchIndex) => {
                                if (!match.visitorTournamentTeam || !match.homeTournamentTeam) {
                                  return (<div/>)
                                }
                                const homeTeam = match.homeTournamentTeam.team
                                const visitorTeam = match.visitorTournamentTeam.team
                                return (
                                  <Card
                                    key={match.id * 1.9}
                                    onClick={e=> this.matchDetail(match, tournament)}
                                    type="inner"
                                    bodyStyle={{ padding: '15px' }}
                                    style ={{ width: '450px', margin: '10px 20px', cursor: 'pointer' }}
                                  >
                                    <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, fontWeight: 'bold' }}>{match.name}</div>
                                    <div style={{ textAlign: 'center', fontSize: '15px', marginBottom: 15 }}>{moment(match.scheduled).format('DD-MM-YYYY HH:mm')}</div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <img alt="error" src={process.env.API_DOMAIN_URL + homeTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
                                        <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{homeTeam.name}</div>
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 10px' }}>
                                        { match.homeScore != null && match.visitorScore != null ?
                                          <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{`${match.homeScore} : ${match.visitorScore}`}</div>
                                          : <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>VS</div>
                                        }
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <img alt="error" src={process.env.API_DOMAIN_URL + visitorTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
                                        <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{visitorTeam.name}</div>
                                      </div>
                                    </div>
                                  </Card>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </Row>
              )
            })
          }
        </Row>
        <MatchDetail
          match={this.state.currentMatchResult}
          tournament={this.state.currentTournament}
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

export default connect(mapStateToProps)(InvitedMatchContainer)