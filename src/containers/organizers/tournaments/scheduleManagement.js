import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { Bracket, BracketGame, BracketGenerator, Model } from 'react-tournament-bracket'
import * as JSOG from 'jsog'
import _ from 'lodash'
import DEMO_DATA from 'global/scheduleDemoData'
import { aloneMatchData, listMatchData } from 'global/1matchData'

const GAMES = JSOG.decode(DEMO_DATA)
const ROOT = aloneMatchData

class ScheduleManagementContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      homeOnTopState: true,
      hoveredTeamId: null
    }

    this.gameComponent = this.gameComponent.bind(this)
    this.gameComponent = this.gameComponent.bind(this)
    this.changeHoveredTeamId = this.changeHoveredTeamId.bind(this)
  }

  componentDidMount() {
    // const { dispatch, params } = this.props
    // dispatch(loadingTourmanetState())
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
      <div className="scheduled" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflow: 'scroll' }}>
        <p>Bracket</p>
        <Bracket
          game={aloneMatchData}
          homeOnTop={homeOnTopState}
          GameComponent={this.gameComponent}
          lineInfo={lineInfo}
          gameDimensions={gameDimensions}
          roundSeparatorWidth={roundSeparatorWidth}
          svgPadding={svgPadding}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(ScheduleManagementContainer)
