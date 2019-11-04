import React, { Component } from 'react'
import { Layout, Typography, Pagination } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import ProfileInfoForm from 'components/organizers/profileForm'
import ChangePasswordForm from 'components/organizers/changePasswordForm'
import { updateProfile, updatePassword } from 'services/organizers/profile/api'
import { showAlert } from 'helpers/alert'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: '24px',
  marginBottom: '24px',
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

  componentDidMount() {
    this.props.dispatch(reset('origanizerChangePasswordForm'))
  }

  componentDidUpdate() {
    showAlert(this.props)
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center' }}>My profile</Title>
        <ProfileInfoFormDecorator/>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Update Passowrd</Title>
        <ChangePasswordFormDecorator/>
      </Content>
    )
  }
}

const ChangePasswordFormDecorator = reduxForm({
  form: 'origanizerChangePasswordForm',
  onSubmit: updatePassword,
  enableReinitialize: true
})(ChangePasswordForm)

let ProfileInfoFormDecorator = reduxForm({
  form: 'origanizerProfileForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit: updateProfile
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
  message: state.organizers.message
})

export default connect(mapStateToProps)(ProfileContainer)