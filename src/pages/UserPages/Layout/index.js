import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from 'pages/UserPages/HomePage'
import ProfilePage from 'pages/UserPages/ProfilePage'
import CategoryPage from 'pages/UserPages/CategoryPage'
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
          <Route exact path={Routes.users.CATEGORY_PAGE} component={CategoryPage} />
        </Switch>
      </div>
    )
  }
}

export default UserLayout