import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { Bracket, BracketGame, BracketGenerator, Model } from 'react-tournament-bracket'
import _ from 'lodash'
import { singleEliminationData } from 'global/1matchData'
import { loadingTourmanetState } from 'services/organizers/tournaments/actions'
import { getTeamManagement, generateTable } from 'services/organizers/tournaments/api'

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
    const { dispatch, params } = this.props
    dispatch(loadingTourmanetState())
    dispatch(getTeamManagement(params.id))
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
    const { tables } = this.props
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
        {_.map(tables, (table, index) => {
          return (<div className="scheduled" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflow: 'scroll' }} key={index}>
            <h3>{table.name}</h3>
            <Bracket
              game={singleEliminationData(table)}
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

const mapStateToProps = (state) => ({
  tables: state.organizers.tournamentPage.teamManagement.tables
})

export default connect(mapStateToProps)(ScheduleManagementContainer)
