import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Modal, Button, Transfer, Radio } from 'antd'
import { joinTournament } from 'services/users/profile/api'

class ApplyFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      teamId: 0,
      tournamentId: 0
    }

    this.handleOk = this.handleOk.bind(this)
    this.selectItem = this.selectItem.bind(this)
  }

  selectItem(event, tournamentId) {
    this.setState({ teamId: event.target.value, tournamentId: tournamentId })
  }

  handleOk() {
    const { dispatch, onCancel } = this.props
    const { tournamentId, teamId } = this.state
    this.setState({ confirmLoading: true })

    setTimeout(() => {
      dispatch(joinTournament(tournamentId, teamId, () => {
        onCancel()
        this.setState({ confirmLoading: false })
      }))
    }, 500)
    console.log('JoinTeam')
  }

  render() {
    const { visible, onCancel, userTeams, categoryId, tournamentId } = this.props
    const { confirmLoading } = this.state

    let team = _.filter(userTeams, function(item) { return item.categoryId == categoryId && item.tournament_teams.length == 0 })

    return (
      <Modal
        title="Join to Tournament"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <div>
          {
            team.length == 0 ? <div>You no have any team. Please create team!!</div> :
            (
              <Radio.Group buttonStyle="solid" onChange={e => this.selectItem(e, tournamentId)}>
                {
                  _.map(team, (item, index) => {
                    return (<Radio.Button value={item.id} key={index}>{item.name}</Radio.Button>)
                  })
                }
              </Radio.Group>
            )
          }
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  userTeams: state.users.userTeam.data
})

export default connect(mapStateToProps)(ApplyFormContainer)
