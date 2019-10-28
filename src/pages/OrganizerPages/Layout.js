import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from 'global/routes'
import { Layout, Menu, Icon } from 'antd'
import SideBar from 'components/organizers/sidebar'
import HeaderContainer from 'containers/organizers/header'
import { connect } from 'react-redux'
import Navigator from 'helpers/history'

const { Header, Content, Footer, Sider } = Layout

class OrganizerLayout extends Component {
  constructor(props) {
    super(props)

    const { authentication: { user } }= this.props

    if (!user.type || user.type != 'organizer'){
      Navigator.push('/login')
    }
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <SideBar/>
        <Layout>
          <HeaderContainer/>
          <Content style={{ margin: '24px 16px 0', height: '100%' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>content</div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.authentication
})

export default connect(mapStateToProps)(OrganizerLayout)