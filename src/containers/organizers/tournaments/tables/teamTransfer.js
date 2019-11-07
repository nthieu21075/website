import React, { Component } from 'react'
import { Transfer } from 'antd'

class TeamTransferContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetKeys: [],
      selectedKeys: [],
      limit: props.table.limit
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleChange(nextTargetKeys, direction, moveKeys) {
    this.setState({ targetKeys: nextTargetKeys })
    console.log('seleted')
    this.props.onChange(nextTargetKeys)
  }

  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] })
    console.log('select change')
    console.log(sourceSelectedKeys)
    console.log(targetSelectedKeys)
    console.log('select change')
  }

  render() {
    const { targetKeys, selectedKeys } = this.state
    const { availableTeam, table } = this.props

    return (
      <div style={{ marginBottom: 20  }}>
        <Transfer
          style={transferStyled}
          dataSource={availableTeam}
          titles={['Team', table.name]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          render={item => item.name}
          rowKey={item => item.tournamentTeamId}
        />
      </div>
    )
  }
}

export default TeamTransferContainer

const transferStyled = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}