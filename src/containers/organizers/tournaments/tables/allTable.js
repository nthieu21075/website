import React, { Component } from 'react'
import { Layout, Typography, Card, Row, Col } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'
import _ from 'lodash'
import AddTeamToTable from './addTeamToTable'
import { removeTeamTable, moveTeamToAnotherTable } from 'services/organizers/tournaments/api'
import { Table, Divider, Tag, Button, Avatar, Menu, Dropdown } from 'antd'

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

const moveTableMenu = (item, tables, click) => {
  return (
    <Menu onClick={(menuItem) => click(item.tableResultId, menuItem)}>
      {_.map(tables, (table, index) => {
        if (table.tableId == item.tableId) {
          return ""
        }

        return <Menu.Item key={table.tableId}>{table.name}</Menu.Item>
      })}
    </Menu>
  )
}

class AllTableContainer extends Component {
  constructor(props) {
    super(props)

    this.onRemoveTeam = this.onRemoveTeam.bind(this)
    this.onMoveTeam = this.onMoveTeam.bind(this)
  }

  onRemoveTeam(item) {
    const { basicInformation, dispatch } = this.props
    dispatch(removeTeamTable(basicInformation.id, item.tableResultId))
  }

  onMoveTeam(tableResultId, menuItem) {
    const { basicInformation, dispatch } = this.props
    dispatch(moveTeamToAnotherTable(basicInformation.id, tableResultId, menuItem.key))
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
              <Col xs={{span: 24}} md={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}} key={index}>
                <Table dataSource={table.teams} style={{ margin: 25 }} pagination={false} bordered={true}>
                  <ColumnGroup title={table.name}>
                    <Column title="" dataIndex="info" render={tableTeam}/>
                    <Column title="MP" dataIndex="wp" />
                    <Column title="Win" dataIndex="win" />
                    <Column title="Lose" dataIndex="lose" />
                    <Column title="Point" dataIndex="point" />
                    <Column title="Actions" key="action" render={(item) => {
                      return (
                        <div style={{ width: 75 }}>
                          <Dropdown overlay={moveTableMenu(item, tables, this.onMoveTeam)} trigger={['click']}>
                            <Button type="primary" icon="double-left"/>
                          </Dropdown>
                          <Button type="danger" icon="close" style={{ marginLeft: 10}} onClick={e => this.onRemoveTeam(item)}/>
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
  tables: state.organizers.tournamentPage.teamManagement.tables,
  basicInformation: state.organizers.tournamentPage.basicInformation
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