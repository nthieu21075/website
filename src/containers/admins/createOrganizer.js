import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import CreateOrganizerForm from 'components/admins/createOrganizerForm'
import { createOrganizer } from 'services/admins/api'

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

class CreateOrganizerContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(reset('adminCreateOrganizerForm'))
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Create Organizer</Title>
        <FormDecorator/>
      </Content>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'adminCreateOrganizerForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: createOrganizer
})(CreateOrganizerForm)

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(CreateOrganizerContainer)