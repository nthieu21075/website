import React, { Component } from 'react'
import { Card, Typography, Avatar } from 'antd'

const { Paragraph, Title, Text } = Typography

const footerStyled = {
  display: 'flex',
  fontSize: '10px',
  justifyContent: 'flex-end',
  alignItems: 'center'
}

const titleStyled = {
  textAlign: 'center',
  margin: '10px 0 5px 0'
}

class TournamenItem extends Component {
  render() {
    const { item, loading, bordered, className } = this.props

    return (
      <div className={className}>
        <Card loading={loading}
          type="inner"
          bodyStyle={{ padding: '12px' }}
          bordered={bordered}
        >
          <img alt="error" src={item.src}/>
          <Title level={4} style={titleStyled}>{item.title}</Title>
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