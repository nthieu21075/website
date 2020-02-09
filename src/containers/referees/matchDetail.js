import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { Tabs, Modal, Button, Transfer, Select, message, InputNumber, Typography, Card, Avatar, DatePicker, Row, Col } from 'antd'
import { updateMatchInfo } from 'services/referees/api'

const { TabPane } = Tabs
const { Option } = Select
const { Paragraph, Title, Text } = Typography

const matchInfo = (match, onChangeHomeScore, onChangeVisitorScore) => {
  return (
    <div style={teamStyled}>
      <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, fontWeight: 'bold' }}>{match.name}</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60%', margin: '10px 0 20px 0' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10 }}>Time:</Text>
        <div style={{ textAlign: 'center', fontSize: '15px' }}>{moment(match.scheduled).format('DD-MM-YYYY HH:mm')}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img alt="error" src={process.env.API_DOMAIN_URL + match.homeTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
          <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{match.homeTeam.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            <InputNumber min={0} defaultValue={match.homeScore ? match.homeScore : 0} onChange={onChangeHomeScore} />
            <span style={{ margin: '0 10px' }}>VS</span>
            <InputNumber min={0} defaultValue={match.visitorScore ? match.visitorScore : 0} onChange={onChangeVisitorScore} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img alt="error" src={process.env.API_DOMAIN_URL + match.visitorTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
          <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{match.visitorTeam.name}</div>
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
    this.confirmModalOk = this.confirmModalOk.bind(this)
  }

  confirmModalOk() {
    const { dispatch, match, tournament } = this.props

    let params = {
      tableId: match.tableId,
      matchId: match.id,
      tournamentId: tournament.id,
      homeScore: this.state.changeHomeScore ? this.state.homeScore : match.homeScore,
      visitorScore: this.state.changeVisitorScore ? this.state.visitorScore : match.visitorScore,
    }

    if ((this.state.changeHomeScore && this.state.homeScore == null) || (this.state.changeVisitorScore && this.state.visitorScore == null)) {
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

  handleOk() {
    if (this.props.match.refereeConfirmed) {
      Modal.info({
        title: 'You have confirmed this match already.',
        content: (
          <div>
            <p>Pls contact organizer if have any issue!!!</p>
          </div>
        )
      })
    } else {
      const { confirmModalOk } = this

      Modal.info({
        title: 'You want to confirm result of this Match.',
        content: (
          <div>
            <p>After confirmed. It will cannot be changed result</p>
          </div>
        ),
        onOk() {
          confirmModalOk()
        }
      })
    }
  }

  onChangeHomeScore(value) {
    this.setState({ homeScore: value, changeHomeScore: true })
  }

  onChangeVisitorScore(value) {
    this.setState({ visitorScore: value, changeVisitorScore: true })
  }

  render() {
    const { confirmLoading } = this.state
    const { visible, closeModal, match, tournament } = this.props

    if (match == null) {
      return(<div/>)
    }

    return (
      <Modal
        visible={visible}
        onOk={this.handleOk}
        okText='Confirm'
        confirmLoading={confirmLoading}
        onCancel={closeModal}
        width='60%'
        keyboard={false}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Match Information" key="1">
            <div style={teamStyled}>
              <div style={teamStyled}>
                {matchInfo(match, this.onChangeHomeScore, this.onChangeVisitorScore)}
                {pitchInformation(match.pitch)}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Tournament Information" key="2">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img alt="error" src={process.env.API_DOMAIN_URL + tournament.mainImageUrl} style={imageStyled} />
              <div style={titleStyled}>{tournament.title}</div>
              <Paragraph >{tournament.description}</Paragraph>
              <div style={footerStyled}>
                <Text strong>Organize By:</Text>
                <Text code>{tournament.organizer.name}</Text>
              </div>
              <div style={footerStyled}>
                <Text strong>Date:</Text>
                <Text code>{`${moment(tournament.startDate).format("DD/MM/YYYY")} - ${moment(tournament.endDate).format("DD/MM/YYYY")}`}</Text>
              </div>
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

export default connect(mapStateToProps)(MatchDetail)

const footerStyled = {
  display: 'flex',
  fontSize: '13px',
  alignItems: 'center',
  marginTop: 5
}

const titleStyled = {
  fontSize: 18,
  fontWeight: 'bold',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  margin: '10px 0 5px 0',
  whiteSpace: 'nowrap'
}

const imageStyled = {
  width: '100%',
  objectFit: 'cover'
}

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