import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Layout, Card, Button, Typography, Row, Col } from 'antd'
import AddTeamToTournamentContainer from './addTeamToTournament'
import RemoveTeamFromTournamentContainer from './removeTeamFromTournament'
const { Title, Text } = Typography
const { Content } = Layout

class AllTeamContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { teams } = this.props

    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: 10 }}>All Team</Title>
        <div style={buttonWrapperStyled}>
          <AddTeamToTournamentContainer/>
          <RemoveTeamFromTournamentContainer/>
        </div>
        <div style={teamWrapperStyled}>
          <Row gutter={20} type='flex' justify='center'>
            { _.map(teams, (team, index) => {
              return (
                <Card
                  key={'team' + index}
                  bodyStyle={teamInfoBodyStyled}
                  hoverable
                  style={teamInfoStyled}
                >
                  <img src={process.env.API_DOMAIN_URL + team.logo} style={teamLogoStyled} />
                  <Text strong>{team.name}</Text>
                </Card>
              )
            })}
          </Row>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  teams: state.organizers.tournamentPage.teamManagement.teams
})

export default connect(mapStateToProps)(AllTeamContainer)

const contentStyled = {
  padding: '24px',
  marginBottom: '24px',
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#fff'
}

const teamInfoStyled = {
  width: 200,
  margin: 15
}

const teamInfoBodyStyled = {
  display: 'flex',
  padding: '0'
}

const teamLogoStyled = {
  width: 50,
  height: 50,
  objectFit: 'cover',
  marginRight: 5
}

const teamWrapperStyled = {
  background: '#ECECEC',
  padding: 30,
  width: '100%'
}

const buttonWrapperStyled = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '10px 0'
}
