import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import CreatePitchForm from 'components/admins/createPitchForm'
import { createPitch, getCategories } from 'services/admins/api'

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

class CreatePitchContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(reset('adminCreatePitchForm'))
    this.props.dispatch(getCategories())
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Create Pitch</Title>
        <FormDecorator/>
      </Content>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'adminCreatePitchForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: createPitch
})(CreatePitchForm)

FormDecorator = connect(
  (state) => ({
    initialValues: {
      categories: state.admins.global.categories,
      categoryId: state.admins.global.categories.length > 0 ? state.admins.global.categories[0].id : 0
    }
  })
)(FormDecorator)

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(CreatePitchContainer)