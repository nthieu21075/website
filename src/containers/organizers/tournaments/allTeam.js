import React, { Component } from 'react'
import { Layout, Typography, Card, Row, Col } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'
import testImage from 'public/images/category.jpg'
import { Table, Divider, Tag, Button } from 'antd'

const { Column, ColumnGroup } = Table
const { Title } = Typography
const { Content } = Layout
const { Meta } = Card

class AllTeamContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: 10 }}>All Team</Title>
        <div style={buttonWrapperStyled}>
          <Button type="primary" icon="plus"> Add team </Button>
          <Button type="danger" icon="minus" style={{ marginLeft: 10}}> Remove team </Button>
        </div>
        <div style={teamWrapperStyled}>
          <Row gutter={20} type="flex" justify="space-around">
            <Card
              hoverable
              style={teamInfoStyled}
              cover={<img src={testImage} style={teamLogoStyled} />}
            >
              <Meta title="Team 1"/>
            </Card>
            <Card
              hoverable
              style={teamInfoStyled}
              cover={<img src={testImage} style={teamLogoStyled} />}
            >
              <Meta title="Team 1"/>
            </Card>
            <Card
              hoverable
              style={teamInfoStyled}
              cover={<img src={testImage} style={teamLogoStyled} />}
            >
              <Meta title="Team 1"/>
            </Card>
            <Card
              hoverable
              style={teamInfoStyled}
              cover={<img src={testImage} style={teamLogoStyled} />}
            >
              <Meta title="Team 1"/>
            </Card>
          </Row>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  message: state.organizers.message
})

export default connect(mapStateToProps)(AllTeamContainer)

const contentStyled = {
  padding: '24px',
  marginBottom: '24px',
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#fff'
}

const teamInfoStyled = {
  width: 150,
  marginTop: 15
}

const teamLogoStyled = {
  width: 150,
  height: 100
}

const teamWrapperStyled = {
  background: '#ECECEC',
  padding: 30,
  width: '100%'
}

const buttonWrapperStyled = {
  width: '100%',
  display: 'flex',
  'justifyContent': 'flex-end',
  'margin': '10px 0'
}
