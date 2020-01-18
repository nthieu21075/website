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

import { showAlert } from 'helpers/alert'

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