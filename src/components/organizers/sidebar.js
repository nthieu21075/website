import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Layout, Menu, Icon, Row } from 'antd'
import _ from 'lodash'
import logo from 'public/images/logo.svg'
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
        className="custom-side-bar"
      >
        <Row type="flex" justify="center">
          <img src={logo} style={{ width: '150px', margin: '20px 0' }}/>
        </Row>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeLink]} selectedKeys={activeLink} onClick={onClick}>
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
            <span className="nav-text">All Tournament</span>
          </Menu.Item>
          <Menu.Item key="finishTournament">
            <Icon type="unordered-list" />
            <span className="nav-text">Finished Tournament</span>
          </Menu.Item>
          <Menu.Item key="happeningTournament">
            <Icon type="unordered-list" />
            <span className="nav-text">Happening Tournament</span>
          </Menu.Item>
          <Menu.Item key="happeningMatch">
            <Icon type="unordered-list" />
            <span className="nav-text">Happening Match</span>
          </Menu.Item>
          <Menu.Item key="requestToJoinTournament">
            <Icon type="unordered-list" />
            <span className="nav-text">Pending Request</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default SideBar