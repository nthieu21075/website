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
        <Menu.Item key='logo' className='header-logo menu-none-hover'>
          <Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Menu.Item>
        <Menu.Item key='search' style={searchItemStyled} className='menu-none-hover'>
          <SearchContainer/>
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

export default Navbar