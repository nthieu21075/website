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
          <Menu.Item key="profile">
            <Icon type="unordered-list" />
            <span className="nav-text">My Profile</span>
          </Menu.Item>
          <Menu.Item key="invitedMatch">
            <Icon type="unordered-list" />
            <span className="nav-text">All Unconfirmed Match</span>
          </Menu.Item>
          <Menu.Item key="finishedMatch">
            <Icon type="unordered-list" />
            <span className="nav-text">Confirmed Match</span>
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