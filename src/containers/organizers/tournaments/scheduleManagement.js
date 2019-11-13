import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { Bracket, BracketGame, BracketGenerator, Model } from 'react-tournament-bracket'
import _ from 'lodash'
import { loadingTourmanetState } from 'services/organizers/tournaments/actions'
import { getSchedule } from 'services/organizers/tournaments/schedule/api'
import { singleElimination, roundRobinGames } from 'helpers/bracket'

class ScheduleManagementContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      homeOnTopState: true,
      hoveredTeamId: null
    }

    this.gameComponent = this.gameComponent.bind(this)
    this.changeHoveredTeamId = this.changeHoveredTeamId.bind(this)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
    dispatch(loadingTourmanetState())
    dispatch(getSchedule(params.id))
  }


  changeHoveredTeamId(hoveredTeamId) {
    this.setState({ hoveredTeamId: hoveredTeamId })
  }

  handleClick(game){
    console.log(game)
    alert('clicked game: ' + game.name)
  }

  gameComponent(props) {
    return (
      <BracketGame
        {...props}
        onHoveredTeamIdChange={this.changeHoveredTeamId}
        onClick={e => this.handleClick(props.game)}
        hoveredTeamId={this.state.hoveredTeamId}/>
    )
  }

  render() {
    const { homeOnTopState } = this.state
    const { schedules, basicInformation } = this.props
    const scheduledType = 'roundRobin'
    const lineInfo =  {
      yOffset: -6,
      separation: 2,
      homeVisitorSpread: 2
    }

    const gameDimensions = {
      height: 80,
      width: 200
    }

    const svgPadding = 20
    const roundSeparatorWidth = 13

    if (basicInformation && basicInformation.scheduledType == 'single') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflow: 'scroll' }}>
          {_.map(schedules, (schedule, index) => {
            return (<div className="scheduled" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflow: 'scroll' }} key={index}>
              <h3>{schedule.table}</h3>
              <Bracket
                game={singleElimination(schedule.matches)}
                homeOnTop={homeOnTopState}
                GameComponent={this.gameComponent}
                lineInfo={lineInfo}
                gameDimensions={gameDimensions}
                roundSeparatorWidth={roundSeparatorWidth}
                svgPadding={svgPadding}
              />
            </div>)
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  schedules: state.organizers.tournamentPage.teamManagement.schedules,
  basicInformation: state.organizers.tournamentPage.basicInformation
})

export default connect(mapStateToProps)(ScheduleManagementContainer)
