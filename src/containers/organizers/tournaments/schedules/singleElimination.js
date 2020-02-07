import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Bracket, BracketGame } from 'react-tournament-bracket'
import _ from 'lodash'
import { singleElimination } from 'helpers/bracket'
import MatchResult from './matchResult'

class SingleEliminationContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoveredTeamId: null,
      showMatchResult: false,
      currentMatchResult: null
    }

    this.gameComponent = this.gameComponent.bind(this)
    this.changeHoveredTeamId = this.changeHoveredTeamId.bind(this)
    this.closeMatchResult = this.closeMatchResult.bind(this)
  }

  changeHoveredTeamId(hoveredTeamId) {
    this.setState({ hoveredTeamId: hoveredTeamId })
  }

  handleClick(game){
    this.setState({ showMatchResult: true, currentMatchResult: game })
  }

  gameComponent(props) {
    return (
      <BracketGame
        {...props}
        onHoveredTeamIdChange={this.changeHoveredTeamId}
        onClick={e => this.handleClick(props.game)}
        hoveredTeamId={this.state.hoveredTeamId}
      />
    )
  }

  closeMatchResult() {
    this.setState({ showMatchResult: false, currentMatchResult: null })
  }

  render() {
    const { schedules } = this.props
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

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflow: 'scroll' }}>
        {_.map(schedules.matches, (schedule, index) => {
          if (schedule.matches.length == 0) {
            return (<div key={index}/>)
          }

          return (<div className="scheduled" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflow: 'scroll' }} key={index}>
            <h3>{schedule.table}</h3>
            <Bracket
              game={singleElimination(schedule.matches)}
              homeOnTop={true}
              GameComponent={this.gameComponent}
              lineInfo={lineInfo}
              gameDimensions={gameDimensions}
              roundSeparatorWidth={roundSeparatorWidth}
              svgPadding={svgPadding}
            />
            <MatchResult
              match={this.state.currentMatchResult}
              visible={this.state.showMatchResult}
              closeModal={this.closeMatchResult}
              pitches={schedules.pitches}
              referees={schedules.referees}
            />
          </div>)
        })}
      </div>
    )
  }
}

export default SingleEliminationContainer
