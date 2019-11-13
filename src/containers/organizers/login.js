import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'tabler-react'
import { reduxForm } from 'redux-form'
import { notification } from 'antd'
import LoginForm from 'components/login/loginForm'
import { submitLogin } from 'services/organizers/authentication/api'
import { initAuthState } from 'services/organizers/authentication/actions'

class LoginContainer extends Component {
  componentDidMount() {
    this.props.dispatch(initAuthState())
  }

  render() {
    return (
      <Card statusColor='blue' title='Organizer Management'>
        <Card.Body>
          <DecoratedLoginForm/>
        </Card.Body>
      </Card>
    )
  }
}

const DecoratedLoginForm = reduxForm({
  form: 'organizerLogin',
  onSubmit: submitLogin
})(LoginForm)

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(LoginContainer)