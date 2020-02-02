import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from 'global/routes'
import { Layout, Menu, Icon } from 'antd'
import SideBarContainer from 'containers/admins/sidebar'
import HeaderContainer from 'containers/admins/header'
import { connect } from 'react-redux'
import Navigator from 'helpers/history'
import OrganizersPage from 'pages/AdminPages/OrganizersPage'
import CreateOrganizerPage from 'pages/AdminPages/CreateOrganizerPage'
import RefereesPage from 'pages/AdminPages/RefereesPage'
import CreateRefereePage from 'pages/AdminPages/CreateRefereePage'
import PitchesPage from 'pages/AdminPages/PitchesPage'
import CreatePitchPage from 'pages/AdminPages/CreatePitchPage'
import CategoriesPage from 'pages/AdminPages/CategoriesPage'
import CreateCategoryPage from 'pages/AdminPages/CreateCategoryPage'

import { showAlert } from 'helpers/adminAlert'

const { Header, Content, Footer, Sider } = Layout

class AdminsLayout extends Component {
  constructor(props) {
    super(props)

    const { authentication: { data } }= this.props

    if (!data){
      Navigator.push(Routes.admins.LOGIN)
    }
  }

  componentDidUpdate() {
    showAlert(this.props)
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <SideBarContainer/>
        <Layout>
          <HeaderContainer/>
          <Content style={{ margin: '24px', height: '100%' }}>
            <Switch>
              <Route exact path={Routes.admins.ORGANIZERS} component={OrganizersPage}/>
              <Route exact path={Routes.admins.ORGANIZER_CREATE} component={CreateOrganizerPage}/>
              <Route exact path={Routes.admins.REFEREES} component={RefereesPage}/>
              <Route exact path={Routes.admins.REFEREE_CREATE} component={CreateRefereePage}/>
              <Route exact path={Routes.admins.PITCHES} component={PitchesPage}/>
              <Route exact path={Routes.admins.PITCH_CREATE} component={CreatePitchPage}/>
              <Route exact path={Routes.admins.CATEGORIES} component={CategoriesPage}/>
              <Route exact path={Routes.admins.CATEGORY_CREATE} component={CreateCategoryPage}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.admins.auth,
  message: state.admins.message
})

export default connect(mapStateToProps)(AdminsLayout)