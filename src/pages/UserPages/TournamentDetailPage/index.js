import React, { Component } from 'react'
import { Layout } from 'antd'
import TournamentDetailContainer from 'containers/users/tournamentDetail'

class TournamentDetailPage extends Component {
  render() {
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <TournamentDetailContainer  params={this.props.match.params}/>
      </Layout>
    )
  }
}

export default TournamentDetailPage