import React, { Component } from 'react'
import { Card, Typography, Avatar, Button, Icon } from 'antd'
import Navigator from 'helpers/history'
import moment from'moment'

const { Paragraph, Title, Text } = Typography

const footerStyled = {
  margin: '20px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const teamStyled = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 0',
  justifyContent: 'center',
  alignItems: 'center'
}

const tournamentStyled = {
  display: 'flex',
  padding: '10px 0',
  justifyContent: 'center',
  alignItems: 'center'
}

class PendingRequestItem extends Component {
  render() {
    const { item, loading, bordered, className, approveRequest, unapproveRequest } = this.props

    return (
      <div className={className}>
        <Card loading={loading}
          type="inner"
          bodyStyle={{ padding: '12px' }}
          bordered={bordered}
        >
          <div onClick={e => Navigator.push('/organizer/tournament/' + item.tournament.id)}>
            <div style={teamStyled}>
              <Avatar src={process.env.API_DOMAIN_URL + item.team.logo} size={80}/>
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.team.name}</Text>
                <div>
                  <Text strong>Owner:</Text>
                  <Text code style={{ marginLeft: 5 }}>{item.team.own.name}</Text>
                </div>
              </div>
            </div>
            <div style={teamStyled}>
              <Text style={{ fontSize: 15 }}>Requesting join to tournament:</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src={process.env.API_DOMAIN_URL + item.tournament.mainImageUrl} size={32}/>
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.tournament.name}</Text>
              </div>
            </div>

            <div style={tournamentStyled} >
              <Text strong>Request At:</Text>
              <Text code style={{ marginLeft: 5 }}>{moment(item.createdAt).format("DD/MM/YYYY HH:MM")}</Text>
            </div>
          </div>
          <div style={footerStyled}>
            <Button type="danger" shape="round" icon="close" onClick={e => unapproveRequest(item.id)}>
              Unapprove
            </Button>
            <Button  icon="check" shape="round" style={{ background: 'green', color: 'white', marginLeft: 15 }} onClick={e => approveRequest(item.id)}>
              Approve
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default PendingRequestItem