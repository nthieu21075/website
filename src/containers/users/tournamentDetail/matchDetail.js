import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { Modal, Button, Typography, Card, Avatar, Row, Col } from 'antd'

const { Paragraph, Title, Text } = Typography

const matchInfo = (match, homeTeam, visitorTeam) => {
  console.log(homeTeam)
  console.log(visitorTeam)
  return (
    <div style={teamStyled}>
      <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: 10, fontWeight: 'bold' }}>{match.name}</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60%', margin: '10px 0 20px 0' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10 }}>Time:</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10 }}>{ moment(match.scheduled).format('DD-MM-YYYY HH:mm') }</Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          match.homeTeam ?
          (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img alt="error" src={process.env.API_DOMAIN_URL + match.homeTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
              <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{match.homeTeam.name}</div>
            </div>
          )
          : (<div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>{`Winner of ${homeTeam.name}`}</div>)
        }
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            { match.homeScore && match.visitorScore ?
              <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{`${match.homeScore} : ${match.visitorScore}`}</div>
              : <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>VS</div>
            }
          </div>
        </div>
        {
          match.visitorTeam ?
          (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img alt="error" src={process.env.API_DOMAIN_URL + match.visitorTeam.logo} style={{ height: 80, objectFit: 'contain' }} />
              <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold', marginTop: 10 }}>{match.visitorTeam.name}</div>
            </div>
          )
          : (<div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>{`Winner of ${visitorTeam.name}`}</div>)
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
        </Col>
      </Row>
    </div>
  )
}

class MatchDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { visible, closeModal, match, homeTeam, visitorTeam } = this.props
    console.log(homeTeam)
    console.log(visitorTeam)
    if (match == null) {
      return(<div/>)
    }

    return (
      <Modal
        visible={visible}
        okText='Save'
        onCancel={closeModal}
        width='60%'
        keyboard={false}
      >
        <div style={teamStyled}>
          {matchInfo(match, homeTeam, visitorTeam)}
          {pitchInformation(match.pitch)}
          {refereeInformation(match.referee)}
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
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