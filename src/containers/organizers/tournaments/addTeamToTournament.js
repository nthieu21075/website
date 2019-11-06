import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Modal, Button, Transfer } from 'antd'

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`
  })
}

class AddTeamToTournamentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalText: 'Content of the modal',
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
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] })

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  showModal() {
    this.setState({ visible: true })
  }

  handleOk() {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    })

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000)
  }

  handleCancel() {
    this.setState({ visible: false })
  }

  render() {
    const { visible, ModalText, confirmLoading, targetKeys, selectedKeys } = this.state

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
            dataSource={mockData}
            titles={['Team', 'Tournament']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            render={item => item.title}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  teams: state.organizers.tournamentPage.teamManagement.teams
})

export default connect(mapStateToProps)(AddTeamToTournamentContainer)

const transferStyled = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}