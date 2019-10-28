import React, { Component } from 'react'
import { Row, Col, Carousel, List, Skeleton, Card, Typography } from 'antd'
import CategoriesList from 'components/users/home/categoriesList'
import categoryImage from 'public/images/category.jpg'

const data = [
  {
    title: 'Leage of Legend 1',
    src: categoryImage
  },
  {
    title: 'Leage of Legend 2',
    src: categoryImage
  },
  {
    title: 'Leage of Legend 3',
    src: categoryImage
  },
  {
    title: 'Leage of Legend 4',
    src: categoryImage
  }
]

const { Title } = Typography

class CategoriesContainer extends Component {
  render() {
    return (
      <div style={{ margin: '30px 0' }}>
        <Row type="flex" justify="center">
          <Title level={2}>Categories</Title>
        </Row>
        <CategoriesList
          grid={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          data={data}
          loading={false}
        />
      </div>
    )
  }
}

export default CategoriesContainer