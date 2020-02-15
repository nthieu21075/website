import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Tabs, Table, Spin, Typography, Row, Col, Avatar, Card } from 'antd'
import Navigator from 'helpers/history'
import moment from 'moment'
import MatchDetail from './matchDetail'
import { getTournamentDetail } from 'services/users/tournaments/api'

const { Column, ColumnGroup } = Table
const { Title, Text } = Typography
const { TabPane } = Tabs


const tableTeam = ({team}) => {
  return (
    <div>
      <Avatar src={process.env.API_DOMAIN_URL + team.logo } style={{ marginRight: 8 }} />
      {team.name}
    </div>
  )
}

class TournamentDetailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tournament: null,
      showMatchResult: false,
      currentMatchResult: null,
      homeTeam: '',
      visitorTeam: ''
    }
    this.closeMatchResult = this.closeMatchResult.bind(this)
    this.showDetail = this.showDetail.bind(this)
  }

  componentDidMount() {
    const { dispatch, params } = this.props

    dispatch(getTournamentDetail(params.tournamentId, (response) => {
      this.setState({ tournament: response })
    }))
  }

  closeMatchResult() {
    this.setState({ showMatchResult: false, currentMatchResult: null, homeTeam: '', visitorTeam: '' })
  }

  showDetail(match, visitorTeam, homeTeam) {
    this.setState({ showMatchResult: true, currentMatchResult: match, visitorTeam: visitorTeam, homeTeam: homeTeam })
  }

  render() {
    const { tournament } = this.state

    if (tournament == null) {
      return (
        <div className="spin-full-screen">
          <Spin tip="Loading..." wrapperClassName=''>
          </Spin>
        </div>
      )
    } else {
      return (
        <Row type="flex" justify="center" style={{ background: 'white', height: '100%' }}>
          <img src={ process.env.API_DOMAIN_URL + tournament.mainImageUrl } style={{ width: '100%', height: 500, objectFit: 'cover' }}/>
          <Col xs={{span: 23}} md={{span: 22}} sm={{span: 21}} lg={{span: 22}} xl={{span: 20}} style={{ paddingBottom: '100px' }}>
            <Row type="flex" justify="center" style={{ margin: 30 }}>
              <Title level={2}>{tournament.name}</Title>
            </Row>
            <Row type="flex" justify="center" style={{ marginBottom: 30 }}>
              <Text>{tournament.description}</Text>
            </Row>
            <Row type="flex" justify="center" style={{ marginBottom: 30 }}>
              <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                <TabPane tab="Schedule Match" key="1">
                  <div>
                    { _.map(tournament.tables, (table, index) => {
                      const scheduled = _.sortBy(table.matches, [function(o) { return o.name }])

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }} key={index}>
                          <Title level={2} style={{ textAlign: 'center' }}>{table.name}</Title>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'wrap row' }}>
                            { _.map(scheduled, (match, matchIndex) => {
                              const previousMatch = _.filter(scheduled, function(o) { return o.rootIndex == match.index })

                              let homeTeam = ''
                              let visitorTeam = ''
                              const homeTournamentTeam = match.homeTournamentTeam
                              const visitorTournamentTeam = match.visitorTournamentTeam

                              if (!homeTournamentTeam && previousMatch.length >0) {
                                homeTeam = previousMatch[0]
                              }

                              if (!visitorTournamentTeam) {
                                if(previousMatch.length == 1 && homeTournamentTeam){
                                  visitorTeam = previousMatch[0]
                                } else if (previousMatch.length == 2){
                                  visitorTeam = previousMatch[1]
                                }
                              }

                              return (
                                <Card
                                  key={match.id}
                                  onClick={e=> this.showDetail(match, visitorTeam, homeTeam)}
                                  type="inner"
                                  bodyStyle={{ padding: '15px' }}
                                  style ={{ width: '450px', margin: '10px 20px', cursor: 'pointer' }}
                                >
                                  <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, fontWeight: 'bold' }}>{match.name}</div>
                                  <div style={{ textAlign: 'center', fontSize: '15px', marginBottom: 15 }}>{moment(match.scheduled).format('DD-MM-YYYY HH:mm')}</div>
                                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                      homeTournamentTeam ?
                                      (
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                          <img alt="error" src={process.env.API_DOMAIN_URL + homeTournamentTeam.team.logo} style={{ height: 80, objectFit: 'contain' }} />
                                          <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{homeTournamentTeam.team.name}</div>
                                        </div>
                                      )
                                      : (<div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>{`Winner of ${homeTeam.name}`}</div>)
                                    }
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 10px' }}>
                                      { match.homeScore && match.visitorScore ?
                                        <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{`${match.homeScore} : ${match.visitorScore}`}</div>
                                        : <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>VS</div>
                                      }
                                    </div>
                                    {
                                      visitorTournamentTeam ?
                                      (
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                          <img alt="error" src={process.env.API_DOMAIN_URL + visitorTournamentTeam.team.logo} style={{ height: 80, objectFit: 'contain' }} />
                                          <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{visitorTournamentTeam.team.name}</div>
                                        </div>
                                      )
                                      : (<div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>{`Winner of ${visitorTeam.name}`}</div>)
                                    }
                                  </div>
                                </Card>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabPane>
                <TabPane tab="League Table" key="2">
                  { _.map(tournament.tables, (table, index) => {
                    const tableResult = _.sortBy(table.table_results, [function(o) { return o.point }])
                    return (
                      <Col xs={{span: 24}} md={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}} key={index}>
                        <Table dataSource={tableResult} style={{ margin: 25 }} pagination={false} bordered={true}>
                          <ColumnGroup title={table.name}>
                            <Column title="" dataIndex="tournament_team" render={tableTeam}/>
                            <Column title="MP" dataIndex="wp" />
                            <Column title="Win" dataIndex="win" />
                            <Column title="Lose" dataIndex="lose" />
                            <Column title="Point" dataIndex="point" />
                          </ColumnGroup>
                        </Table>
                      </Col>
                    )
                  })}
                </TabPane>
              </Tabs>
            </Row>
          </Col>
          <MatchDetail
            match={this.state.currentMatchResult}
            visitorTeam={this.state.visitorTeam}
            homeTeam={this.state.homeTeam}
            visible={this.state.showMatchResult}
            closeModal={this.closeMatchResult}
          />
        </Row>
      )
    }
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(TournamentDetailContainer)