import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from 'global/routes'
import { Layout, Menu, Icon } from 'antd'
import SideBar from 'components/organizers/sidebar'
import Navbar from 'components/organizers/nav'

const { Header, Content, Footer, Sider } = Layout

class OrganizerLayout extends Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <SideBar/>
        <Layout>
          <Navbar/>
          <Content style={{ margin: '24px 16px 0', height: '100%' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>content</div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default OrganizerLayout