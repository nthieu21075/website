import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { Tabs, Modal, Button, Transfer, Select, message, InputNumber, Typography, Card, Avatar, DatePicker, Row, Col } from 'antd'
import { updateMatchInfo } from 'services/organizers/tournaments/schedule/api'

const { TabPane } = Tabs
const { Option } = Select
const { Paragraph, Title, Text } = Typography

const matchInfo = (match, onChangeHomeScore, onChangeVisitorScore, onScheduledOk) => {
  const data = match.matchData
  return (
    <div style={teamStyled}>
      <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, fontWeight: 'bold' }}>{data.name}</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60%', margin: '10px 0 20px 0' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10 }}>Time:</Text>
        <DatePicker showTime placeholder="Select Time" onOk={onScheduledOk} defaultValue={moment(parseInt(data.scheduled))} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          data.homeTeam ?
          (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img alt="error" src={process.env.API_DOMAIN_URL + data.homeTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
              <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{data.homeTeam.name}</div>
            </div>
          )
          : (<div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>{match.sides.home.seed.displayName}</div>)
        }
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            <InputNumber min={0} defaultValue={data.homeScore ? data.homeScore : 0} onChange={onChangeHomeScore} />
            <span style={{ margin: '0 10px' }}>VS</span>
            <InputNumber min={0} defaultValue={data.visitorScore ? data.visitorScore : 0} onChange={onChangeVisitorScore} />
          </div>
        </div>
        {
          data.visitorTeam ?
          (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img alt="error" src={process.env.API_DOMAIN_URL + data.visitorTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
              <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{data.visitorTeam.name}</div>
            </div>
          )
          : (<div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>{match.sides.visitor.seed.displayName}</div>)
        }
      </div>
    </div>
  )
}

const pitchInformation = (currentPitch) => {
  if (!currentPitch) {
    return(
      <div/>
    )
  }
  return(
    <div style={teamStyled} key={'pitch'}>
      <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, marginTop: 30, fontWeight: 'bold' }}>Pitch Information</div>
      <Row style={{ width: '100%', alignItems: 'center', display: 'flex' }}>
        <Col span={8}>
          <img src={process.env.API_DOMAIN_URL + currentPitch.mainImageUrl} style={{ height: 'auto', objectFit: 'cover', width: '100%' }}></img>
        </Col>
        <Col span={16} style={{ padding: '0 10px' }}>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Name:</div>
            {currentPitch.name}
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Owner Name:</div>
            {currentPitch.ownerName}
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Address:</div>
            <Text>
              {`${currentPitch.address} - `}
              { currentPitch.location.map((item, index) => {
                if(index == 0) {
                  return (<span key={index} style={{margin: '0 2px'}} >{item}</span>)
                } else {
                  return (<span key={index} style={{margin: '0 2px'}} >{` - ${item}`}</span>)
                }
              })}
            </Text>
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Phone Number:</div>
            {currentPitch.phoneNumber}
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Price:</div>
            {currentPitch.price}
          </div>
        </Col>
      </Row>
    </div>
  )
}

const refereeInformation = (currentReferee) => {
  if (!currentReferee) {
    return(
      <div/>
    )
  }
  return(
    <div style={teamStyled} key={'referee'}>
      <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, marginTop: 30, fontWeight: 'bold' }}>Referee Information</div>
      <Row style={{ width: '100%', alignItems: 'center', display: 'flex' }}>
        <Col span={24} style={{ padding: '0 10px' }}>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Name:</div>
            {currentReferee.name}
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Email:</div>
            {currentReferee.email}
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Address:</div>
            <Text>
              {`${currentReferee.address} - `}
              { currentReferee.location.map((item, index) => {
                if(index == 0) {
                  return (<span key={index} style={{margin: '0 2px'}} >{item}</span>)
                } else {
                  return (<span key={index} style={{margin: '0 2px'}} >{` - ${item}`}</span>)
                }
              })}
            </Text>
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Phone Number:</div>
            {currentReferee.phoneNumber}
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
            <div style={{ fontWeight: 'bold', marginRight: 5 }}>Price:</div>
            {currentReferee.price}
          </div>
        </Col>
      </Row>
    </div>
  )
}

class MatchResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      homeScore: 0,
      changeHomeScore: false,
      changeVisitorScore: false,
      changeScheduled: false,
      changePitch: false,
      changeReferee: false,
      visitorScore: 0,
      pitchId: 0,
      refereeId: 0,
      scheduled: null
    }

    this.handleOk = this.handleOk.bind(this)
    this.onChangeHomeScore = this.onChangeHomeScore.bind(this)
    this.onChangeVisitorScore = this.onChangeVisitorScore.bind(this)
    this.selectPitch = this.selectPitch.bind(this)
    this.selectReferee = this.selectReferee.bind(this)
    this.onScheduledOk = this.onScheduledOk.bind(this)
  }

  handleOk() {
    const { dispatch, match: { matchData } } = this.props
    const pitchId = matchData.pitch ? matchData.pitch.id : 0
    const refereeId = matchData.referee ? matchData.referee.id : 0

    let params = {
      tableId: matchData.tableId,
      homeTournamentTeamId: matchData.homeTeam ? matchData.homeTeam.tournamentId : null,
      visitorTournamentTeamId: matchData.visitorTeam ? matchData.visitorTeam.tournamentId : null,
      matchId: matchData.id,
      tournamentId: this.props.basicInformation.id,
      pitchId: this.state.changePitch ? this.state.pitchId : pitchId,
      refereeId: this.state.changeReferee ? this.state.refereeId : refereeId,
      homeScore: this.state.changeHomeScore ? this.state.homeScore : matchData.homeScore,
      visitorScore: this.state.changeVisitorScore ? this.state.visitorScore : matchData.visitorScore,
      scheduled: this.state.changeScheduled ? this.state.scheduled : matchData.scheduled
    }

    if ((this.state.changeHomeScore && !this.state.homeScore) || (this.state.changeVisitorScore && !this.state.visitorScore)) {
      return message.error('Please input score of this match')
    }

    this.setState({ confirmLoading: true })
    setTimeout(() => {
      dispatch(updateMatchInfo(params, () => {
        this.setState({
          confirmLoading: false,
          homeScore: 0,
          visitorScore: 0,
          pitchId: 0,
          refereeId: 0,
          changeHomeScore: false,
          changeVisitorScore: false,
          changeScheduled: false,
          changePitch: false,
          changeReferee: false,
          scheduled: null
        })
        this.props.closeModal()
      }))
    }, 500)
  }

  onScheduledOk(value) {
    this.setState({ scheduled: value.valueOf(), changeScheduled: true })
  }

  onChangeHomeScore(value) {
    this.setState({ homeScore: value, changeHomeScore: true })
  }

  onChangeVisitorScore(value) {
    this.setState({ visitorScore: value, changeVisitorScore: true })
  }

  selectPitch(id) {
    this.setState({ pitchId: id, changePitch: true })
  }

  selectReferee(id) {
    this.setState({ refereeId: id, changeReferee: true })
  }

  render() {
    const { confirmLoading } = this.state
    const { visible, closeModal, match, referees, pitches } = this.props

    if (match == null) {
      return(<div/>)
    }

    return (
      <Modal
        visible={visible}
        onOk={this.handleOk}
        okText='Save'
        confirmLoading={confirmLoading}
        onCancel={closeModal}
        width='60%'
        keyboard={false}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Match Information" key="1">
            <div style={teamStyled}>
              {matchInfo(match, this.onChangeHomeScore, this.onChangeVisitorScore, this.onScheduledOk)}
              {pitchInformation(match.matchData.pitch)}
              {refereeInformation(match.matchData.referee)}
            </div>
          </TabPane>
          <TabPane tab="Select Pitch" key="2">
            <div className='pitch-wrapper'>
              {pitches.map((item, index) => {
                if (match.matchData.pitch && item.id == match.matchData.pitch.id) {
                  return(<div/>)
                }

                return (
                  <Card
                    key={item.id}
                    style={{ cursor: 'pointer', width: 300, margin: 20 }}
                    type="inner"
                    bodyStyle={{ padding: '0' }}
                    bordered={true}
                  >
                    <Card.Grid className={this.state.pitchId == item.id && 'active'} style={{ width: '100%', padding: 0 }} hoverable={false}>
                      <div style={pitchStyled} onClick={e => this.selectPitch(item.id)}>
                        <img src={ process.env.API_DOMAIN_URL + item.mainImageUrl } style={{ width: '100%', height: 150, objectFit: 'cover' }}/>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 10, padding: 10 }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                          <Text style={{ fontSize: 15 }}>{`Price: ${item.price}`}</Text>
                          <Text style={{ fontSize: 15, textAlign: 'center' }}>
                            {`${item.address} - `}
                            { item.location.map((item, index) => {
                              if(index == 0) {
                                return (<span key={index} style={{margin: '0 2px'}} >{item}</span>)
                              } else {
                                return (<span key={index} style={{margin: '0 2px'}} >{` - ${item}`}</span>)
                              }
                            })}
                          </Text>
                          <Text style={{ fontSize: 15 }}>{`Owner: ${item.ownerName}`}</Text>
                          <Text style={{ fontSize: 15 }}>{`Phone number: ${item.phoneNumber}`}</Text>
                        </div>
                      </div>
                    </Card.Grid>
                  </Card>
                )
              })}
            </div>
          </TabPane>
          <TabPane tab="Select Referee" key="3">
            <div className='pitch-wrapper'>
              {referees.map((item, index) => {
                if (match.matchData.referee && item.id == match.matchData.referee.id) {
                  return(<div/>)
                }

                return (
                  <Card
                    key={item.id}
                    style={{ cursor: 'pointer', width: 300, margin: 20 }}
                    type="inner"
                    bodyStyle={{ padding: '0' }}
                    bordered={true}
                  >
                    <Card.Grid className={this.state.refereeId == item.id && 'active'} style={{ width: '100%', padding: '10px 0' }} hoverable={false}>
                      <div style={pitchStyled} onClick={e => this.selectReferee(item.id)}>
                        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yaq_DZKXinW1i0VvxAgrMQd7gVid0idFr0nxfWrvGStgnHmT&s" size={100}/>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 10, padding: 10 }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.email}</Text>
                          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                          <Text style={{ fontSize: 15 }}>{`Price: ${item.price}`}</Text>
                          <Text style={{ fontSize: 15, textAlign: 'center', height: 50 }}>
                            {`${item.address} - `}
                            { item.location.map((item, index) => {
                              if(index == 0) {
                                return (<span key={index} style={{margin: '0 2px'}} >{item}</span>)
                              } else {
                                return (<span key={index} style={{margin: '0 2px'}} >{` - ${item}`}</span>)
                              }
                            })}
                          </Text>
                          <Text style={{ fontSize: 15 }}>{`Phone number: ${item.phoneNumber}`}</Text>
                        </div>
                      </div>
                    </Card.Grid>
                  </Card>
                )
              })}
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  basicInformation: state.organizers.tournamentPage.basicInformation
})

export default connect(mapStateToProps)(MatchResult)

const pitchStyled = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
}

const pitchFooterStyled = {
  display: 'flex',
  padding: '10px 0',
  justifyContent: 'center',
  alignItems: 'center'
}

const teamStyled = {
  flexDirection: 'column',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const transferStyled = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}