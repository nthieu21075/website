import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Menu, Icon, Row, Avatar, Badge } from 'antd'
import SearchContainer from 'containers/users/share/search'
import _ from 'lodash'

const { SubMenu } = Menu

const userInfo = (user) => (
  <SubMenu
    style={lastMenuItemStyled}
    title={
      <span className="submenu-title-wrapper">
        <Badge count={10}>
          <Avatar className="menu-user-logo" icon="user" />
        </Badge>
        {user.name}
      </span>
    }
  >
    <Menu.ItemGroup key='profile'>
      <Menu.Item key="profile">
        <Icon type="user"/>
        Profile
      </Menu.Item>
      <Menu.Item key="notification">
        <Badge count={10} dot>
          <Icon type="notification" />
        </Badge>
        Notification
      </Menu.Item>
      <Menu.Item key="logout">
        <Icon type="logout"/>
        Logout
      </Menu.Item>
    </Menu.ItemGroup>
  </SubMenu>
)

const loginItem = () => (
  <Menu.Item key='login' style={lastMenuItemStyled}>
    <Icon type="login" />
    <Link to='/login'>Login</Link>
  </Menu.Item>
)

const registerItem = () => (
  <Menu.Item key='register' style={menuItemStyled}>
    <Icon type="user-add" />
    <Link to='/register'>Register</Link>
  </Menu.Item>
)

const categoriesItem = () => (
  <SubMenu
    style={{ float: 'right' }}
    title={<span className="submenu-title-wrapper">Categories</span>}
  >
    <Menu.ItemGroup key='category' title="Sports">
      <Menu.Item key="subCategory:1">Football</Menu.Item>
      <Menu.Item key="subCategory:2">Basketball</Menu.Item>
      <Menu.Item key="subCategory:3">Volleyball</Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup key='category_1' title="ESports">
      <Menu.Item key="subCategory:4">League of legend</Menu.Item>
      <Menu.Item key="subCategory:5">Dota</Menu.Item>
      <Menu.Item key="subCategory:6">Dota 2</Menu.Item>
    </Menu.ItemGroup>
  </SubMenu>
)

class AuthNav extends Component {
  render() {
    const { user, onClick } = this.props
    return (
      <Menu mode="horizontal" style={{ height: '60px', lineHeight: '60px' }} onClick={onClick}>
        <Menu.Item key='logo' className='header-logo menu-none-hover'>
          <Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Menu.Item>
        <Menu.Item key='search' style={searchItemStyled} className='menu-none-hover'>
          <SearchContainer/>
        </Menu.Item>
        {_.size(user) > 0 && userInfo(user)}
        {_.size(user) == 0 && loginItem()}
        {_.size(user) == 0 && registerItem()}
        {categoriesItem()}
        <Menu.Item key='sports' style={menuItemStyled}>
          <Link to='/'> Place of organization</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

const menuItemStyled = {
  float: 'right',
  display: 'flex',
  alignItems: 'center'
}

const avatarItemStyled = {
  float: 'left',
  alignItems: 'center',
  marginLeft: '5%'
}

const searchItemStyled = {
  float: 'left',
  display: 'flex',
  alignItems: 'center',
}

const lastMenuItemStyled = {
  float: 'right',
  display: 'flex',
  alignItems: 'center',
  marginRight: '5%'
}

export default AuthNav