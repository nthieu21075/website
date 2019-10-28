import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Layout, Menu, Icon, Row } from 'antd'
import _ from 'lodash'

const { Sider } = Layout

class SideBar extends Component {
  render() {
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default SideBar