import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import _ from 'lodash'

const { SubMenu } = Menu
const { Sider } = Layout

class TournamentMenu extends Component {
  render() {
    const { onClick, items } = this.props
    const activeMenu = _.map(items, 'key')
    console.log(activeMenu)
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['all']}
          defaultOpenKeys={activeMenu}
          style={{ height: '100%' }}
          onClick={onClick}
        >
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
              return <Menu.Item key={item.key}>{item.title}</Menu.Item>
            }
          })}
        </Menu>
      </Sider>
    )
  }
}

export default TournamentMenu