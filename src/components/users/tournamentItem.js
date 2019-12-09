import React, { Component } from 'react'
import { Card, Typography, Avatar, Icon, Button } from 'antd'
import Navigator from 'helpers/history'
import moment from 'moment'
const { Paragraph, Title, Text } = Typography

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
  height: 150,
  width: '100%',
  objectFit: 'cover'
}

class TournamenItem extends Component {
  render() {
    const { item, loading, bordered, className, joinTournament } = this.props

    return (
      <div className={className} style={{ cursor: 'pointer' }}>
        <Card loading={loading}
          type="inner"
          bodyStyle={{ padding: '12px' }}
          bordered={bordered}
        >
          <div onClick={ e => Navigator.push('tournament/' + item.id) }>
            <img alt="error" src={process.env.API_DOMAIN_URL + item.src} style={imageStyled} />
            <div style={titleStyled}>{item.title}</div>
            <Paragraph>{item.description}</Paragraph>
            <div style={footerStyled}>
              <Text strong>Organize By:</Text>
              <Text code>{item.organizer}</Text>
            </div>
            <div style={footerStyled}>
              <Text strong>Date:</Text>
              <Text code>{`${moment(item.startDate).format("DD/MM/YYYY")} - ${moment(item.endDate).format("DD/MM/YYYY")}`}</Text>
            </div>
            <div style={footerStyled}>
              <Text strong>Team:</Text>
              <Text code>{`${item.currentTeam} / ${item.team}`}</Text>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='primary' style={{ marginTop: 15 }} onClick={e => joinTournament(item.categoryId, item.id)} >Join Tournament</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default TournamenItem