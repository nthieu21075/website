import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Modal, Button, Transfer, Select, message } from 'antd'
import { addToTeamTable } from 'services/organizers/tournaments/api'

const { Option } = Select

class AddTeamToTableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableId: null,
      visible: false,
      confirmLoading: false,
      targetKeys: [],
      selectedKeys: []
    }

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSelectTable = this.handleSelectTable.bind(this)
  }

  handleChange(nextTargetKeys, direction, moveKeys) {
    this.setState({ targetKeys: nextTargetKeys })
  }

  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] })
  }

  showModal() {
    this.setState({ visible: true })
  }

  handleOk() {
    let { tableId, targetKeys } = this.state
    const { dispatch, basicInformation, tables } = this.props
    const tableOptions = listAvailableTable(basicInformation, tables)

    if (tableOptions.length == 0) {
      message.error('All table is full')
      return
    }

    if (targetKeys.length == 0) {
      message.error(`Please transfer team to table`)
      return
    }

    if (tableId == null) {
      tableId = tableOptions[0].id
    }

    const currentTable = _.filter(tableOptions, item => item.id === tableId)
    this.setState({ confirmLoading: true })

    if (targetKeys.length > currentTable[0].limit) {
       message.error(`Only can add ${currentTable.limit} team to table ${currentTable.name}`)
    } else {
      setTimeout(() => {
        dispatch(addToTeamTable(basicInformation.id, targetKeys, tableId, () => {
          this.setState({ visible: false, confirmLoading: false, selectedKeys: [], targetKeys: [] })
        }))
      }, 500)
    }
  }

  handleCancel() {
    this.setState({ visible: false, selectedKeys: [], targetKeys: [] })
  }

  handleSelectTable(value) {
    this.setState({ tableId: value.key })
  }

  render() {
    const { visible, confirmLoading, targetKeys, selectedKeys } = this.state
    const { teams, basicInformation, tables  } = this.props
    const tableOptions = listAvailableTable(basicInformation, tables)

    return (
      <div>
        <Button type='primary' icon='plus' style={{ marginLeft: 10}} onClick={this.showModal}>Add Team to Table </Button>
        <Modal
          title="Add Team to Table"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Select
            style={{ width: '100%', marginBottom: 20 }}
            labelInValue
            defaultValue={{ key: tableOptions[0] ? tableOptions[0].id : '' }}
            onChange={this.handleSelectTable}
          >
            {_.map(tableOptions, (table, index) => {
              return <Option value={table.id} key={index}>{table.name}</Option>
            })}
          </Select>
          <Transfer
            style={transferStyled}
            dataSource={teams}
            titles={['Team', 'Table']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            render={item => item.name}
            rowKey={item => item.tournamentTeamId}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  teams: state.organizers.tournamentPage.teamManagement.teams,
  tables: state.organizers.tournamentPage.teamManagement.tables,
  basicInformation: state.organizers.tournamentPage.basicInformation
})

const listAvailableTable = (basicInformation, tables) => {
  let listTable = []

  _.forEach(tables, (table) => {
    if (table.teams.length < basicInformation.teamOfTable){
      listTable.push({
        id: table.tableId,
        name: table.name,
        limit: basicInformation.teamOfTable - table.teams.length
      })
    }
  })
  return listTable
}

export default connect(mapStateToProps)(AddTeamToTableContainer)

const transferStyled = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}