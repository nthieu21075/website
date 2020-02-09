import React, { Component } from 'react'
import { Layout, Typography, Pagination } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import ProfileInfoForm from 'components/referees/profileForm'
import ChangePasswordForm from 'components/referees/changePasswordForm'
import { getProfileDetail, updatePassword, updateProfile } from 'services/referees/api'

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
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.props.dispatch(reset('refereeChangePasswordForm'))
    this.props.dispatch(getProfileDetail((response) => {
      this.setState({ data: response })
    }))
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center' }}>My profile</Title>
        <ProfileInfoFormDecorator data={this.state.data}/>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Update Passowrd</Title>
        <ChangePasswordFormDecorator/>
      </Content>
    )
  }
}

const ChangePasswordFormDecorator = reduxForm({
  form: 'refereeChangePasswordForm',
  onSubmit: updatePassword,
  enableReinitialize: true
})(ChangePasswordForm)

let ProfileInfoFormDecorator = reduxForm({
  form: 'refereeProfileForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit: updateProfile
})(ProfileInfoForm)

ProfileInfoFormDecorator = connect(
  (state, ownState) => {
    const data = ownState.data
    return ({
      initialValues: {
        email: data.email,
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        location: data.location
      }
    })
  }
)(ProfileInfoFormDecorator)

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(ProfileContainer)