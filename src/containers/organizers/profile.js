import React, { Component } from 'react'
import { Layout, Typography, Pagination } from 'antd'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { notification } from 'antd'
import ProfileInfoForm from 'components/organizers/profileForm'
import { submitUpdateProfile } from 'services/origanizers/profile/api'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: '24px',
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#fff'
}

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    const { authentication } = this.props

    if (authentication.errors) {
      notification['error']({ message: authentication.errors })
    }

    if (authentication.success) {
      notification['success']({ message: authentication.success })
    }
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center' }}>My profile</Title>
        <ProfileInfoFormDecorator/>
      </Content>
    )
  }
}

let ProfileInfoFormDecorator = reduxForm({
  form: 'origanizerProfileForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit: submitUpdateProfile
})(ProfileInfoForm)

ProfileInfoFormDecorator = connect(
  ({authentication: { user }}) => ({
    initialValues: {
      email: user.email,
      name: user.name,
      address: user.address,
      phoneNumber: user.phoneNumber,
      organizerName: user.organizerName,
      location: user.location
    }
  })
)(ProfileInfoFormDecorator)

const mapStateToProps = (state) => ({
  authentication: state.authentication
})

export default connect(mapStateToProps)(ProfileContainer)