import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Icon, message, Popconfirm } from 'antd'
import AllTableContainer from './tables/allTable'
import AllTeamContainer from './teams/allTeam'
import { loadingTourmanetState } from 'services/organizers/tournaments/actions'
import { getTeamManagement, generateTable } from 'services/organizers/tournaments/api'

const text = 'Are you sure want to auto generate table. All schedule will be delete?';

class TeamManagementContainer extends Component {
  constructor(props) {
    super(props)
    this.autoGenerateTable = this.autoGenerateTable.bind(this)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
    dispatch(loadingTourmanetState())
    dispatch(getTeamManagement(params.id))
  }

  autoGenerateTable() {
    const { dispatch, params } = this.props
    dispatch(loadingTourmanetState())
    dispatch(generateTable(params.id))
  }

  render() {
    return (
      <Row>
        <Col span={24}>
          <div style={buttonWrapperStyled}>
           <Popconfirm placement="top" title={text} onConfirm={this.autoGenerateTable} okText="Yes" cancelText="No">
              <Button type='primary' shape='round'>
                <Icon type="sync" spin />
                Auto Generate Table
              </Button>
            </Popconfirm>
          </div>
        </Col>
        <Col span={24}>
          <AllTeamContainer id={this.params.id}/>
          <AllTableContainer id={this.params.id}/>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(TeamManagementContainer)

const buttonWrapperStyled = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px 0'
}
