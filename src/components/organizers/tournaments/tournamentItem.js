import React, { Component } from 'react'
import { Card, Typography, Avatar } from 'antd'
import Navigator from 'helpers/history'
import moment from 'moment'
const { Paragraph, Title, Text } = Typography
import { Tag } from 'antd';

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
  height: 200,
  width: '100%',
  objectFit: 'cover'
}

class TournamenItem extends Component {
  render() {
    const { item, loading, bordered, className } = this.props
    let currentTeam = _.filter(item.teams, function(item) { return item.status == 'approved' })
    return (
      <div className={className}>
        <Card loading={loading}
          type="inner"
          bodyStyle={{ padding: '12px' }}
          bordered={bordered}
          onClick={e => Navigator.push('/organizer/tournament/' + item.id)}
        >
          <div onClick={ e => Navigator.push('tournament/' + item.id) }>
            <img alt="error" src={process.env.API_DOMAIN_URL + item.src} style={imageStyled} />
            <div style={titleStyled}>{item.title}</div>
            <Paragraph>{item.description}</Paragraph>
            <div style={footerStyled}>
              <Text strong style={{ marginRight: 10 }} >Published:</Text>
              <Tag color={ item.publish ? 'green' : 'red' }>{ item.publish ? 'Yes' : 'No' }</Tag>
            </div>
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
              <Text code>{`${currentTeam.length} / ${item.team}`}</Text>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default TournamenItem
