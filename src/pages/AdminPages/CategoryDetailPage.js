import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import CategoryDetailContainer from 'containers/admins/categoryDetail'

class CategoryDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('categories'))
  }

  render() {
    const { match: { params } } = this.props

    return (
      <CategoryDetailContainer params={params}/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(CategoryDetailPage)