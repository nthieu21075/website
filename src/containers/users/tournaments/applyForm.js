import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Modal, Button, Transfer, Radio } from 'antd'
import { joinTournament } from 'services/users/profile/api'
import Navigator from 'helpers/history'
import { joinTournamentNotification } from 'services/notification'

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
    const { dispatch, onCancel, tournament } = this.props
    const { tournamentId, teamId } = this.state
    this.setState({ confirmLoading: true })

    setTimeout(() => {
      dispatch(joinTournament(tournamentId, teamId, () => {
        onCancel()
        dispatch(joinTournamentNotification({ tournamentName: tournament.title, organizerId: tournament.organizerId }))
        this.setState({ confirmLoading: false })
      }))
    }, 500)
    console.log('JoinTeam')
  }

  render() {
    const { visible, onCancel, userTeams, categoryId, tournament, teams, tournamentTeam, authentication } = this.props
    const tournamentId = tournament.id
    const { confirmLoading } = this.state

    if (!authentication.logged) {
      return (
        <Modal
          title="Warning"
          visible={visible}
          okButtonProps={{ style: { display: 'none' } }}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <div style={{ textAlign: 'center', marginBottom: 10, fontSize: 17, fontWeight: 'bold' }}>Please login to your account to join this tournament!!!</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button shape="round" onClick={e => Navigator.push('/login')}>Login</Button>
            <Button icon="plus" shape="round" style={{ background: 'green', color: 'white', marginLeft: 15 }} onClick={e => Navigator.push('/register')}>Create new account</Button>
          </div>
        </Modal>
      )
    }

    let joinedTeam = _.filter(tournamentTeam, function(item) { return item.tournamentId == tournamentId && item.status == 'approved'})

    if (joinedTeam.length > 0) {
      return (
        <Modal
          title="Warning"
          visible={visible}
          okButtonProps={{ disabled: true }}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <div style={{ textAlign: 'center', marginBottom: 10, fontSize: 17, fontWeight: 'bold' }}>You have team joined this tournament!!</div>
          <Radio.Group buttonStyle="solid" onChange={e => this.selectItem(e, tournamentId)}>
            {
              _.map(joinedTeam, (item, index) => {
                return (<Radio.Button value={item.id} key={index}>{item.team.name}</Radio.Button>)
              })
            }
          </Radio.Group>
        </Modal>
      )
    }

    joinedTeam = _.filter(tournamentTeam, function(item) { return item.tournamentId == tournamentId && item.status == 'pending'})

    if (joinedTeam.length > 0) {
      return (
        <Modal
          title="Warning"
          visible={visible}
          onOk={this.handleOk}
          okButtonProps={{ disabled: true }}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <div style={{ textAlign: 'center', marginBottom: 10, fontSize: 17, fontWeight: 'bold' }}>Your request is waiting organizer approve!!</div>
          <Radio.Group buttonStyle="solid" onChange={e => this.selectItem(e, tournamentId)}>
            {
              _.map(joinedTeam, (item, index) => {
                return (<Radio.Button value={item.id} key={index}>{item.team.name}</Radio.Button>)
              })
            }
          </Radio.Group>
        </Modal>
      )
    }

    joinedTeam = _.filter(tournamentTeam, function(item) { return item.tournamentId == tournamentId && item.status == 'canceled' })

    let teamIds = _.map(joinedTeam, 'teamId')

    let team = _.filter(userTeams, (item) => {
      return (item.categoryId == categoryId && item.tournament_teams.length == 0) || _.includes(teamIds, item.id)
    })

    return (
      <Modal
        title="Join to Tournament"
        visible={visible}
        onOk={this.handleOk}
        okButtonProps={{ disabled: team.length == 0 }}
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
  userTeams: state.users.userTeam.data.team,
  authentication: state.users.auth,
  tournamentTeam: state.users.userTeam.data.tournamentTeam
})

export default connect(mapStateToProps)(ApplyFormContainer)
