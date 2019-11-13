import React, { Component } from 'react'
import { Card, Typography, Avatar } from 'antd'
import Navigator from 'helpers/history'
const { Paragraph, Title, Text } = Typography

const footerStyled = {
  display: 'flex',
  fontSize: '10px',
  justifyContent: 'flex-end',
  alignItems: 'center'
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
    const { item, loading, bordered, className } = this.props

    return (
      <div className={className} style={{ cursor: 'pointer' }} onClick={ e => Navigator.push('tournament/' + item.id) }>
        <Card loading={loading}
          type="inner"
          bodyStyle={{ padding: '12px' }}
          bordered={bordered}
        >
          <img alt="error" src={process.env.API_DOMAIN_URL + item.src} style={imageStyled} />
          <div style={titleStyled}>{item.title}</div>
          <Paragraph>{item.description}</Paragraph>
          <div style={footerStyled}>
            <Text strong>Organize By:</Text>
            <Text code>{item.organizer}</Text>
            <Avatar size={22} icon="user" />
          </div>
        </Card>
      </div>
    )
  }
}

export default TournamenItem