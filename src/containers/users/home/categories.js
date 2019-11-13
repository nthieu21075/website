import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Carousel, List, Skeleton, Card, Typography } from 'antd'
import CategoriesList from 'components/users/home/categoriesList'

const { Title } = Typography

class CategoriesContainer extends Component {
  render() {
    const { categories } = this.props

    return (
      <div style={{ margin: '30px 0' }}>
        <Row type="flex" justify="center">
          <Title level={2}>Categories</Title>
        </Row>
        <CategoriesList
          grid={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          data={categories}
          loading={categories.length == 0}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.users.categories.data
})

export default connect(mapStateToProps)(CategoriesContainer)