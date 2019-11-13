import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import _ from 'lodash'

const { SubMenu } = Menu
const { Sider } = Layout

class TournamentMenu extends Component {
  render() {
    const { onClick, items, activeMenu } = this.props

    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={activeMenu}
          style={{ height: '100%' }}
          onClick={onClick}
        >
          <Menu.Item key='all'>All</Menu.Item>
          {_.map(items, item => {
            if (item.child && item.child.length > 0 ) {
              return (
                <SubMenu
                  key={item.key}
                  title={ <span>{item.title}</span> }
                >
                  {_.map(item.child, childItem => {
                    return <Menu.Item key={childItem.key}>{childItem.title}</Menu.Item>
                  })}
                </SubMenu>
              )
            } else {
              return <Menu.Item key={item.id.toString()}>{item.name}</Menu.Item>
            }
          })}
        </Menu>
      </Sider>
    )
  }
}

export default TournamentMenu