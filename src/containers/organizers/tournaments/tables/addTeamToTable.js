import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Modal, Button, Transfer } from 'antd'
import { getAvailbaleTeam, addTeam } from 'services/organizers/tournaments/api'
import TeamTransferContainer from './teamTransfer'

class AddTeamToTableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmLoading: false,
      targetKeys: [],
      availableTeam: []
    }

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.updateAvailableTeam = this.updateAvailableTeam.bind(this)
  }

  showModal() {
    this.setState({ visible: true })
  }

  handleOk() {
    const { dispatch, basicInformation: { id } } = this.props
    const { targetKeys } = this.state
    this.setState({ confirmLoading: true })

    setTimeout(() => {
      this.setState({ visible: false, confirmLoading: false, targetKeys: [] })
    }, 500)
  }

  handleCancel() {
    this.setState({ visible: false, targetKeys: [] })
  }

  componentWillUpdate() {
    if (this.state.availableTeam.length == 0 && this.props.teams.length > 0) {
      this.setState({ availableTeam: this.props.teams })
    }
  }

  updateAvailableTeam(selectedItem) {
    console.log('updateAvailableTeam')
    console.log(selectedItem)
  }

  render() {
    const { tables, basicInformation } = this.props
    const { visible, confirmLoading, targetKeys, availableTeam } = this.state
    const listTable = listAvailableTable(basicInformation, tables)

    return (
      <div>
        <Button type='primary' icon='plus' onClick={this.showModal}> Add team to Table</Button>
        <Modal
          title="Add team to Table"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {_.map(listTable, (table, index) => {
            return <TeamTransferContainer table={table} availableTeam={availableTeam} key={index} onChange={this.updateAvailableTeam}/>
          })}
        </Modal>
      </div>
    )
  }
}

const listAvailableTable = (basicInformation, tables) => {
  let listTable = []

  _.forEach(tables, (table) => {
    if (table.teams.length < basicInformation.teamOfTable){
      listTable.push({
        name: table.name,
        limit: basicInformation.teamOfTable - table.teams.length
      })
    }
  })
  return listTable
}

const mapStateToProps = (state) => ({
  teams: state.organizers.tournamentPage.teamManagement.teams,
  tables: state.organizers.tournamentPage.teamManagement.tables,
  basicInformation: state.organizers.tournamentPage.basicInformation
})

export default connect(mapStateToProps)(AddTeamToTableContainer)
