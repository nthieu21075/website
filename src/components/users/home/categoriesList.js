import React, { Component } from 'react'
import { List, Card } from 'antd'

class CategoriesList extends Component {
  render() {
    const { grid, data, loading } = this.props

    return (
      <List
        grid={grid}
        dataSource={data}
        renderItem={ item => (
          <List.Item style={{ padding: '5px 15px', cursor: 'pointer' }} >
            <Card loading={loading}
              type="inner"
              cover={ <img alt="error" src={item.src}/> }
              bodyStyle={{ padding: '15px' }}
            >
              <Card.Meta title={item.title} style={{ textAlign: 'center' }}/>
            </Card>
          </List.Item>
        )}
      />
    )
  }
}

export default CategoriesList