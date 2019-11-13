import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { BackTop } from 'antd'
import { store, persistor } from 'stores/store/index'
import ScrollToTop from './scrollToTop'
import Routes from 'global/routes'
import history from 'helpers/history'

// Authentication Pages
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'

//Error Pages
import ErrorPage from 'pages/ErrorPage'
// User Pages
import UserLayout from 'pages/UserPages/Layout'
// Organiser Pages
import OrganizerLayout from 'pages/OrganizerPages/Layout'
import OrganizerLoginPage from 'pages/OrganizerPages/LoginPage'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <BackTop />
        <ScrollToTop>
          <Switch>
            <Route exact path={Routes.REGISTER_PAGE} component={RegisterPage} />
            <Route exact path={Routes.LOGIN_PAGE} component={LoginPage} />
            <Route exact path={Routes.organizers.LOGIN} component={OrganizerLoginPage}/>
            <Route path='/organizer' component={OrganizerLayout} />
            <Route path='/500'>
              <ErrorPage
                status="500"
                title="500"
                message="Sorry, the server is wrong."
              />
            </Route>
            <Route path='/404'>
              <ErrorPage
                status="404"
                title="404"
                message="Sorry, the page you visited does not exist."
              />
            </Route>
            <Route path='/403'>
              <ErrorPage
                status="403"
                title="403"
                message="Sorry, you are not authorized to access this page."
              />
            </Route>
            <Route path='/' component={UserLayout} />
          </Switch>
        </ScrollToTop>
      </Router>
    </PersistGate>
  </Provider>
)

export default App
