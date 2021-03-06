import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Menu, Icon, Row, Avatar, Badge } from 'antd'
import SearchContainer from 'containers/users/share/search'
import _ from 'lodash'

class Navbar extends Component {
  render() {
    const { user, onClick } = this.props
    return (
      <Menu mode="horizontal" style={{ height: '60px', lineHeight: '60px' }} onClick={onClick}>
        <Menu.Item key='search' style={searchItemStyled} className='menu-none-hover'>
          <SearchContainer type="organizer"/>
        </Menu.Item>
        <Menu.Item key="logout" style={lastMenuItemStyled}>
          <Icon type="logout"/>
          Logout
        </Menu.Item>
        <Menu.Item key="notification" style={menuItemStyled}>
          <Badge count={10} dot> <Icon type="notification" /> </Badge>
        </Menu.Item>
      </Menu>
    )
  }
}

const searchItemStyled = {
  float: 'left',
  display: 'flex',
  alignItems: 'center',
}

const menuItemStyled = {
  float: 'right',
  display: 'flex',
  alignItems: 'center',
  height: '100%'
}

const lastMenuItemStyled = {
  float: 'right',
  display: 'flex',
  alignItems: 'center',
  marginRight: '20px'
}

export default Navbar