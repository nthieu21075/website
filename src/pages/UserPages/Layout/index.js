import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from 'pages/UserPages/HomePage'
import ProfilePage from 'pages/UserPages/ProfilePage'
import TournamentsPage from 'pages/UserPages/TournamentsPage'
import TournamentDetailPage from 'pages/UserPages/TournamentDetailPage'

import HeaderContainer from 'containers/users/layout/header'
import Routes from 'global/routes'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/userAlert'
import { getCategories } from 'services/users/category/api'
import { userTeam } from 'services/users/tournaments/api'

class UserLayout extends Component {
  componentDidUpdate() {
    showAlert(this.props)
    this.props.dispatch(getCategories())
    if (this.props.authentication.logged){
      this.props.dispatch(userTeam())
    }
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <HeaderContainer/>
        <Switch>
          <Route exact path={Routes.users.HOME_PAGE} component={HomePage} />
          <Route exact path={Routes.users.PROFILE_PAGE} component={ProfilePage} />
          <Route exact path={Routes.users.TOURNAMENTS_PAGE + '/:categoryId'} component={TournamentsPage} />
          <Route exact path={Routes.users.TOURNAMENT_DETAIL_PAGE + '/:tournamentId'} component={TournamentDetailPage} />
        </Switch>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  message: state.users.message,
  authentication: state.users.auth
})

export default connect(mapStateToProps)(UserLayout)