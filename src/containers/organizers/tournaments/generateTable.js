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

const data = [
  {
    key: '1',
    team: 'Team 1',
    win: 1,
    lose: 2,
    add: 10,
    minus: 5,
    mp: '-5',
    point: 3
  },
  {
    key: '2',
    team: 'Team 2',
    win: 1,
    lose: 2,
    add: 10,
    minus: 5,
    mp: '+5',
    point: 3
  },
  {
    key: '3',
    team: 'Team 3',
    win: 1,
    lose: 2,
    add: 10,
    minus: 5,
    mp: '+5',
    point: 3
  },
  {
    key: '4',
    team: 'Team 4',
    win: 1,
    lose: 2,
    add: 10,
    minus: 5,
    mp: '-5',
    point: 3
  }
]

const buttonWrapperStyled = {
  width: '100%',
  display: 'flex',
  'justifyContent': 'flex-end',
  'margin': '10px 0'
}

class GenerateTableContainer extends Component {
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
        <Title level={3} style={{ textAlign: 'center', marginTop: 10 }}>Team Table</Title>
        <div style={buttonWrapperStyled}>
          <Button type="primary" icon="plus"> Add team </Button>
          <Button type="danger" icon="minus" style={{ marginLeft: 10}}> Remove team </Button>
          <Button type="danger" icon="left" style={{ marginLeft: 10}}> Move team </Button>
        </div>
        <Row gutter={24} type="flex" justify="space-around">
          <Table dataSource={data} style={{ margin: 25 }} pagination={false} bordered={true}>
            <ColumnGroup title="Table A">
              <Column title="Team" dataIndex="team" key="team" />
              <Column title="MP" dataIndex="mp" key="mp" />
              <Column title="Win" dataIndex="win" key="win" />
              <Column title="Lose" dataIndex="lose" key="lose" />
              <Column title="Point" dataIndex="point" key="point" />
            </ColumnGroup>
          </Table>
          <Table dataSource={data} style={{ margin: 25 }} pagination={false} bordered={true}>
            <ColumnGroup title="Table B">
              <Column title="Team" dataIndex="team" key="team" />
              <Column title="MP" dataIndex="mp" key="mp" />
              <Column title="Win" dataIndex="win" key="win" />
              <Column title="Lose" dataIndex="lose" key="lose" />
              <Column title="Point" dataIndex="point" key="point" />
            </ColumnGroup>
          </Table>
        </Row>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  message: state.organizers.message
})

export default connect(mapStateToProps)(GenerateTableContainer)