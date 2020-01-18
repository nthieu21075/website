import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Table, Spin, Typography, Row, Col, Avatar, Card } from 'antd'
import Navigator from 'helpers/history'
import moment from 'moment'
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
    this.state = { tournament: null }
  }

  componentDidMount() {
    const { dispatch, params } = this.props

    dispatch(getTournamentDetail(params.tournamentId, (response) => {
      this.setState({ tournament: response })
    }))
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
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }} key={index}>
                          <Title level={2} style={{ textAlign: 'center' }}>{table.name}</Title>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'wrap row' }}>
                            { _.map(table.matches, (match, matchIndex) => {
                              return (
                                <Card
                                  key={matchIndex * index + 1}
                                  onClick={e=> console.log('click')}
                                  type="inner"
                                  bodyStyle={{ padding: '15px' }}
                                  style ={{ width: '450px', margin: '10px 20px' }}
                                >
                                  <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, fontWeight: 'bold' }}>{match.name}</div>
                                  <div style={{ textAlign: 'center', fontSize: '15px', marginBottom: 15 }}>{moment(match.scheduled).format('DD-MM-YYYY HH:mm')}</div>
                                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                      match.homeTeam ?
                                      (
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                          <img alt="error" src={process.env.API_DOMAIN_URL + match.homeTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
                                          <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{match.homeTeam.name}</div>
                                        </div>
                                      )
                                      : (<div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>{`Winner of ${table.matches[matchIndex - 2].name}`}</div>)
                                    }
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 10px' }}>
                                      { match.homeScore && match.visitorScore ?
                                        <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{`${match.homeScore} : ${match.visitorScore}`}</div>
                                        : <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>VS</div>
                                      }
                                    </div>
                                    {
                                      match.visitorTeam ?
                                      (
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                          <img alt="error" src={process.env.API_DOMAIN_URL + match.visitorTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
                                          <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{match.visitorTeam.name}</div>
                                        </div>
                                      )
                                      : (<div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>{`Winner of ${table.matches[matchIndex - 1] ? table.matches[matchIndex - 1].name : ''}`}</div>)
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
                    return (
                      <Col xs={{span: 24}} md={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}} key={index}>
                        <Table dataSource={table.table_results} style={{ margin: 25 }} pagination={false} bordered={true}>
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
        </Row>
      )
    }
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(TournamentDetailContainer)