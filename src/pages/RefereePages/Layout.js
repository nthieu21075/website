import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from 'global/routes'
import { Layout, Menu, Icon } from 'antd'
import SideBarContainer from 'containers/referees/sidebar'
import HeaderContainer from 'containers/referees/header'
import { connect } from 'react-redux'
import Navigator from 'helpers/history'

import { showAlert } from 'helpers/refereeAlert'

const { Header, Content, Footer, Sider } = Layout

class refereesLayout extends Component {
  constructor(props) {
    super(props)

    const { authentication: { data } }= this.props

    if (!data){
      Navigator.push(Routes.referee.LOGIN)
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
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.referee.auth,
  message: state.referee.message
})

export default connect(mapStateToProps)(refereesLayout)