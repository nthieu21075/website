import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar, Typography } from 'antd'

const { SubMenu } = Menu
const { Sider } = Layout
const { Title } = Typography

class ProfileMenu extends Component {
  render() {
    const { onClick } = this.props

    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['profile']}
          defaultOpenKeys={['profileInfo', 'tournament']}
          style={{ height: '100%' }}
          onClick={onClick}
        >
          <div className="profile-avatar-wrapper">
            <Avatar size={80} icon="user" />
            <Title level={4}>Jack ly</Title>
          </div>
          <SubMenu
            key="profileInfo"
            title={
              <span>
                <Icon type="user" />
                My Information
              </span>
            }
          >
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="changePassword">Change Password</Menu.Item>
          </SubMenu>
          <SubMenu
            key="tournament"
            title={
              <span>
                <Icon type="laptop" />
                Tournaments
              </span>
            }
          >
            <Menu.Item key="tournament:happening">Finished</Menu.Item>
            <Menu.Item key="tournament:pending">Awaiting moderation</Menu.Item>
            <Menu.Item key="tournament:rejected">Rejected</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default ProfileMenu