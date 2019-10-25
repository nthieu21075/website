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
          <Col xs={{span: 23}} md={{span: 22}} sm={{span: 21}} lg={{span: 21}} xl={{span: 21}} style={{ paddingBottom: '100px' }}>
            <CategoriesContainer/>
            <TournamentContainer title="My tournament is happening" autoPlay={false} infinite={false} slidesToShow={3}/>
            <TournamentContainer title="Tournaments" autoPlay={true} infinite={true} slidesToShow={4}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HomePage