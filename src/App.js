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
// User Pages
import UserLayout from 'pages/UserPages/Layout'


const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <BackTop />
        <ScrollToTop>
          <Switch>
            <Route exact path={Routes.REGISTER_PAGE} component={RegisterPage} />
            <Route exact path={Routes.LOGIN_PAGE} component={LoginPage} />
            <Route path='/' component={UserLayout} />
          </Switch>
        </ScrollToTop>
      </Router>
    </PersistGate>
  </Provider>
)

export default App
