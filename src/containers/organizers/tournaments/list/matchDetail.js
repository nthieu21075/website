import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { Tabs, Modal, Button, Transfer, Select, message, InputNumber, Typography, Card, Avatar, DatePicker, Row, Col } from 'antd'
import { updateMatchInfo } from 'services/organizers/tournaments/schedule/api'

const { TabPane } = Tabs
const { Option } = Select
const { Paragraph, Title, Text } = Typography

const matchInfo = (match, onChangeHomeScore, onChangeVisitorScore) => {
  const homeTeam = match.homeTournamentTeam.team
  const visitorTeam = match.visitorTournamentTeam.team
  return (
    <div style={teamStyled}>
      <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, fontWeight: 'bold' }}>{match.name}</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60%', margin: '10px 0 20px 0' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10 }}>Time:</Text>
        <div style={{ textAlign: 'center', fontSize: '15px' }}>{moment(match.scheduled).format('DD-MM-YYYY HH:mm')}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img alt="error" src={process.env.API_DOMAIN_URL + homeTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
          <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{homeTeam.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            <InputNumber min={0} defaultValue={match.homeScore ? match.homeScore : 0} onChange={onChangeHomeScore} />
            <span style={{ margin: '0 10px' }}>VS</span>
            <InputNumber min={0} defaultValue={match.visitorScore ? match.visitorScore : 0} onChange={onChangeVisitorScore} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img alt="error" src={process.env.API_DOMAIN_URL + visitorTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
          <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{visitorTeam.name}</div>
        </div>
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

class MatchDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      homeScore: 0,
      changeHomeScore: false,
      changeVisitorScore: false,
      visitorScore: 0
    }

    this.handleOk = this.handleOk.bind(this)
    this.onChangeHomeScore = this.onChangeHomeScore.bind(this)
    this.onChangeVisitorScore = this.onChangeVisitorScore.bind(this)
  }

  handleOk() {
    const { dispatch, match } = this.props
    const pitchId = match.pitch ? match.pitch.id : 0
    const refereeId = match.referee ? match.referee.id : 0
    const homeTeam = match.homeTournamentTeam ? match.homeTournamentTeam : null
    const visitorTeam = match.visitorTournamentTeam ? match.visitorTournamentTeam : null

    let params = {
      tableId: match.tableId,
      homeTournamentTeamId: homeTeam ? homeTeam.id : null,
      visitorTournamentTeamId: visitorTeam ? visitorTeam.id : null,
      matchId: match.id,
      tournamentId: this.props.basicInformation.id,
      pitchId: pitchId,
      refereeId: refereeId,
      homeScore: this.state.changeHomeScore ? this.state.homeScore : match.homeScore,
      visitorScore: this.state.changeVisitorScore ? this.state.visitorScore : match.visitorScore,
      scheduled: moment(match.scheduled).valueOf()
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
          changeHomeScore: false,
          changeVisitorScore: false,
        })
        this.props.getData()
        this.props.closeModal()
      }))
    }, 500)
  }

  onChangeHomeScore(value) {
    this.setState({ homeScore: value, changeHomeScore: true })
  }

  onChangeVisitorScore(value) {
    this.setState({ visitorScore: value, changeVisitorScore: true })
  }

  render() {
    const { confirmLoading } = this.state
    const { visible, closeModal, match } = this.props

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
        <div style={teamStyled}>
          {matchInfo(match, this.onChangeHomeScore, this.onChangeVisitorScore)}
          {pitchInformation(match.pitch)}
          {refereeInformation(match.referee)}
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  basicInformation: state.organizers.tournamentPage.basicInformation
})

export default connect(mapStateToProps)(MatchDetail)

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