import React, { Component } from 'react'
import { Row, Col, Layout } from 'antd'
import ListTournamentContainer from 'containers/users/tournaments'
import TournamentContainer from 'containers/users/home/tournament'

class TournamentsPage extends Component {
  render() {
    return (
      <Layout style={{ width: '100%' }}>
        <Row type="flex" justify="center">
          <Col xs={{span: 23}} md={{span: 22}} sm={{span: 21}} lg={{span: 21}} xl={{span: 21}} style={{ paddingBottom: '100px' }}>
            <ListTournamentContainer/>
            <TournamentContainer title="Recommended" autoPlay={true} infinite={true} slidesToShow={4}/>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default TournamentsPage