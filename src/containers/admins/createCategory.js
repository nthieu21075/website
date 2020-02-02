import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import CreateCategoryForm from 'components/admins/createCategoryForm'
import { createCategory } from 'services/admins/api'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: 24,
  marginBottom: 24,
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#fff'
}

class CreateCategoryContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(reset('adminCreateCategoryForm'))
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Create Category</Title>
        <FormDecorator/>
      </Content>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'adminCreateCategoryForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: createCategory
})(CreateCategoryForm)

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(CreateCategoryContainer)