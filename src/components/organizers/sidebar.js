import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Layout, Menu, Icon, Row } from 'antd'
import _ from 'lodash'

const { Sider } = Layout

class SideBar extends Component {
  render() {
    const { onClick, activeLink } = this.props
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Row type="flex" justify="center">
          <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ width: '60px', marginBottom: '10px' }}/>
        </Row>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeLink]} onClick={onClick}>
          <Menu.Item key="myProfile">
            <Icon type="unordered-list" />
            <span className="nav-text">My profile</span>
          </Menu.Item>
          <Menu.Item key="createTournament">
            <Icon type="unordered-list" />
            <span className="nav-text">Create Tournament</span>
          </Menu.Item>
          <Menu.Item key="unpublishTour">
            <Icon type="unordered-list" />
            <span className="nav-text">List Tournament</span>
          </Menu.Item>
          <Menu.Item key="publishedTour">
            <Icon type="unordered-list" />
            <span className="nav-text">Finished Tournament</span>
          </Menu.Item>
          <Menu.Item key="happeningTour">
            <Icon type="unordered-list" />
            <span className="nav-text">Happening Tournament</span>
          </Menu.Item>
          <Menu.Item key="happeningMatch">
            <Icon type="unordered-list" />
            <span className="nav-text">Happening Match</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default SideBar