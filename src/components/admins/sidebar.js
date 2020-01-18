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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeLink]} selectedKeys={activeLink} onClick={onClick}>
          <Menu.Item key="organizers">
            <Icon type="unordered-list" />
            <span className="nav-text">Organizers Management</span>
          </Menu.Item>
          <Menu.Item key="referees">
            <Icon type="unordered-list" />
            <span className="nav-text">Referees Management</span>
          </Menu.Item>
          <Menu.Item key="pitches">
            <Icon type="unordered-list" />
            <span className="nav-text">Pitches Management</span>
          </Menu.Item>
          <Menu.Item key="categories">
            <Icon type="unordered-list" />
            <span className="nav-text">Categories Management</span>
          </Menu.Item>
          <Menu.Item key="manual">
            <Icon type="unordered-list" />
            <span className="nav-text">Manual</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default SideBar