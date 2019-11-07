import React, { Component } from 'react'
import { Layout, Typography, Card, Row, Col } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'
import { Table, Divider, Tag, Button, Avatar } from 'antd'
import _ from 'lodash'
import AddTeamToTable from './addTeamToTable'

const { Column, ColumnGroup } = Table
const { Title } = Typography
const { Content } = Layout
const { Meta } = Card

const tableTeam = ({name, logo}) => {
  return (
    <div>
      <Avatar src={process.env.API_DOMAIN_URL + logo } style={{ marginRight: 8 }} />
      {name}
    </div>
  )
}

class AllTableContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tables } = this.props
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: 10 }}>Team Table</Title>
        <div style={buttonWrapperStyled}>
          <AddTeamToTable/>
        </div>
        <Row type="flex" justify="center" style={{width: '100%'}}>
          { _.map(tables, (table, index) => {
            return (
              <Col xs={{span: 20}} md={{span: 20}} sm={{span: 20}} lg={{span: 20}} xl={{span: 11}} key={index}>
                <Table dataSource={table.teams} style={{ margin: 25 }} pagination={false} bordered={true}>
                  <ColumnGroup title={table.name}>
                    <Column title="" dataIndex="info" render={tableTeam}/>
                    <Column title="MP" dataIndex="wp" />
                    <Column title="Win" dataIndex="win" />
                    <Column title="Lose" dataIndex="lose" />
                    <Column title="Point" dataIndex="point" />
                    <Column title="Actions" key="action" render={(item) => {
                      return (
                        <div>
                          <Button type="primary" icon="double-left"/>
                          <Button type="danger" icon="close" style={{ marginLeft: 10}}/>
                        </div>
                      )
                    }} />
                  </ColumnGroup>
                </Table>
              </Col>
            )
          })}
        </Row>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  tables: state.organizers.tournamentPage.teamManagement.tables
})

export default connect(mapStateToProps)(AllTableContainer)

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