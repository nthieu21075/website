import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import CreateRefereeForm from 'components/admins/createRefereeForm'
import { createReferee, getCategories } from 'services/admins/api'

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

class CreateRefereeContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(reset('adminCreateRefereeForm'))
    this.props.dispatch(getCategories())
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Create Referee</Title>
        <FormDecorator/>
      </Content>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'adminCreateRefereeForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: createReferee
})(CreateRefereeForm)

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

export default connect(mapStateToProps)(CreateRefereeContainer)