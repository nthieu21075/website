import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from 'pages/UserPages/HomePage'
import ProfilePage from 'pages/UserPages/ProfilePage'
import TournamentsPage from 'pages/UserPages/TournamentsPage'
import HeaderContainer from 'containers/users/layout/header'
import Routes from 'global/routes'

class UserLayout extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <HeaderContainer/>
        <Switch>
          <Route exact path={Routes.users.HOME_PAGE} component={HomePage} />
          <Route exact path={Routes.users.PROFILE_PAGE} component={ProfilePage} />
          <Route exact path={Routes.users.TOURNAMENTS_PAGE + '/:id'} component={TournamentsPage} />
        </Switch>
      </div>
    )
  }
}

export default UserLayout