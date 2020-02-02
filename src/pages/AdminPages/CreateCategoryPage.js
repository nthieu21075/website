import React, { Component } from 'react'
import CreateCategoryContainer from 'containers/admins/createCategory'
import { connect } from 'react-redux'
import { updateSideBarActive } from 'services/admins/global/actions'

class CreateCategoryPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('categories'))
  }

  render() {
    return (
      <CreateCategoryContainer/>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(CreateCategoryPage)