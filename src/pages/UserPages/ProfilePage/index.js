import React, { Component } from 'react'
import { Row, Col, Layout } from 'antd'
import ProfileContainer from 'containers/users/profile/index'


class HomePage extends Component {
  render() {
    return (
      <Layout style={{ height: '100%', width: '100%' }}>
        <Row type="flex" justify="center">
          <Col xs={{span: 22}} md={{span: 22}} sm={{span: 22}} lg={{span: 20}} xl={{span: 20}} style={{ paddingBottom: '100px' }}>
            <ProfileContainer/>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default HomePage