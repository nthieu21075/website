import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Modal, Button, Transfer } from 'antd'
import { getAvailbaleTeam, addTeam } from 'services/organizers/tournaments/api'

class AddTeamToTournamentContainer extends Component {
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
    const { dispatch, basicInformation} = this.props

    if (_.size(basicInformation) > 0) {
      dispatch(getAvailbaleTeam(basicInformation.category.id, basicInformation.id))
    }
  }

  handleOk() {
    const { dispatch, basicInformation: { id } } = this.props
    const { targetKeys } = this.state
    this.setState({ confirmLoading: true })

    setTimeout(() => {
      if (targetKeys.length > 0) {
        dispatch(addTeam(targetKeys, id, () => {
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
    const { availableTeam } = this.props

    return (
      <div>
        <Button type='primary' icon='plus' onClick={this.showModal}> Add team </Button>
        <Modal
          title="Add Team To Tournament"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Transfer
            style={transferStyled}
            dataSource={availableTeam}
            titles={['Team', 'Tournament']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            render={item => item.name}
            rowKey={item => item.id}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  availableTeam: state.organizers.tournamentPage.teamManagement.availableTeam,
  basicInformation: state.organizers.tournamentPage.basicInformation
})

export default connect(mapStateToProps)(AddTeamToTournamentContainer)

const transferStyled = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}