import React, { Component } from 'react'
import { List, Card, Typography, Avatar } from 'antd'
import TournamentItem from 'components/organizers/tournaments/tournamentItem'

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

const itemStyled = {
  padding: '5px 15px',
  cursor: 'pointer'
}

class ListTournament extends Component {
  render() {
    const { grid, data, loading, bordered } = this.props

    return (
      <List
        grid={grid}
        dataSource={data}
        renderItem={ item => (
          <List.Item style={itemStyled} >
            <TournamentItem
              loading={loading}
              bordered={bordered}
              item={item}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default ListTournament