import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Menu, Icon, Row, Avatar, Badge } from 'antd'
import SearchContainer from 'containers/users/share/search'
import _ from 'lodash'
import logo from 'public/images/header_logo.svg'

const { SubMenu } = Menu

const userInfo = (user) => (
  <SubMenu
    style={lastMenuItemStyled}
    title={
      <span className="submenu-title-wrapper">
        <Badge count={6}>
          <Avatar className="menu-user-logo" icon="user" />
        </Badge>
        {user.name}
      </span>
    }
  >
    <Menu.ItemGroup key='profile'>
      <Menu.Item key="createTeam">
        <Icon type="team"/>
        Create Team
      </Menu.Item>
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

class AuthNav extends Component {
  render() {
    const { user, onClick, categories } = this.props
    return (
      <Menu mode="horizontal" style={{ height: '60px', lineHeight: '60px' }} onClick={onClick}>
        <Menu.Item key='logo' className='header-logo menu-none-hover'>
          <img src={logo} style={{ width: 120 }} />
        </Menu.Item>
        <Menu.Item key='search' style={searchItemStyled} className='menu-none-hover'>
          <SearchContainer type="user"/>
        </Menu.Item>
        {_.size(user) > 0 && userInfo(user)}
        {_.size(user) == 0 && loginItem()}
        {_.size(user) == 0 && registerItem()}
        {_.map(categories.data, (category) => {
          return <Menu.Item key={'categoryItem' + category.id} style={categoryItemStyled} id={category.id}>{category.name}</Menu.Item>
        })}
      </Menu>
    )
  }
}

const menuItemStyled = {
  float: 'right',
  display: 'flex',
  alignItems: 'center'
}

const categoryItemStyled = {
  float: 'right',
  display: 'flex',
  alignItems: 'center'
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