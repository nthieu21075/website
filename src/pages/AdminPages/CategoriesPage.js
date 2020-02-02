import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'
import CategoriesContainer from 'containers/admins/categories'

class CategoriesPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('categories'))
  }

  render() {
    return (
      <CategoriesContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(CategoriesPage)