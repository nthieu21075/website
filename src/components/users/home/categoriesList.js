import React, { Component } from 'react'
import { List, Card } from 'antd'
import _ from 'lodash'
import Navigator from 'helpers/history'

class CategoriesList extends Component {
  render() {
    const { grid, data, loading } = this.props
    let items = loading ? _.range(0, 4, 1) : data
    return (
      <List
        grid={grid}
        dataSource={items}
        renderItem={ item => (
          <List.Item style={{ padding: '5px 15px', cursor: 'pointer' }} >
            <Card loading={loading}
              onClick={  e=> Navigator.push('/tournaments/' + item.id)}
              type="inner"
              cover={ <img alt="error" src={process.env.API_DOMAIN_URL + item.imageUrl} style={{ height: 100, objectFit: 'cover' }} /> }
              bodyStyle={{ padding: '15px' }}
            >
              <Card.Meta title={item.name} style={{ textAlign: 'center' }}/>
            </Card>
          </List.Item>
        )}
      />
    )
  }
}

export default CategoriesList