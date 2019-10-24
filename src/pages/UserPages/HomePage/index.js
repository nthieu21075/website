import React, { Component } from 'react'
import BannerContainer from 'containers/users/home/banner'
import TournamentContainer from 'containers/users/home/tournament'
import CategoriesContainer from 'containers/users/home/categories'
import { Row, Col } from 'antd'

class HomePage extends Component {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <BannerContainer/>
        <Row type="flex" justify="center">
          <Col xs={{span: 22}} md={{span: 22}} sm={{span: 22}} lg={{span: 20}} xl={{span: 20}}>
            <CategoriesContainer/>
            <TournamentContainer title="My tournament is happening" autoPlay={false} infinite={false}/>
            <TournamentContainer title="Tournaments" autoPlay={true} infinite={true}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HomePage