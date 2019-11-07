import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Modal, Button, Transfer } from 'antd'
import { getAvailbaleTeam, addTeam, removeTeam } from 'services/organizers/tournaments/api'

class RemoveTeamFromTournamentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const { dispatch, basicInformation: { id } } = this.props
    const { targetKeys } = this.state
    this.setState({ confirmLoading: true })

    setTimeout(() => {
      if (targetKeys.length > 0) {
        dispatch(removeTeam(targetKeys, id, () => {
          this.setState({ visible: false, confirmLoading: false, selectedKeys: [], targetKeys: [] })
        }))
      } else {
          this.setState({ visible: false, confirmLoading: false, selectedKeys: [], targetKeys: [] })
      }
    }, 500)
  }

  handleCancel() {
    this.setState({ visible: false, selectedKeys: [], targetKeys: [] })
  }

  render() {
    const { visible, confirmLoading, targetKeys, selectedKeys } = this.state
    const { teams } = this.props

    return (
      <div>
        <Button type='danger' icon='minus' style={{ marginLeft: 10}} onClick={this.showModal}> Remove team </Button>
        <Modal
          title="Remove Team From Tournament"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Transfer
            style={transferStyled}
            dataSource={teams}
            titles={['Team', 'Remove List']}
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
  basicInformation: state.organizers.tournamentPage.basicInformation
})

export default connect(mapStateToProps)(RemoveTeamFromTournamentContainer)

const transferStyled = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}