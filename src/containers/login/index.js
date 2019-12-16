import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'tabler-react'
import { reduxForm } from 'redux-form'
import { notification } from 'antd'
import LoginForm from 'components/login/loginForm'
import { submitLogin } from 'services/users/authentication/api'
import { initAuthState } from 'services/users/authentication/actions'

class LoginContainer extends Component {
  componentDidMount() {
    this.props.dispatch(initAuthState())
  }

  render() {
    return (
      <Card statusColor='blue' title='Login to your Account'>
        <Card.Body>
          <DecoratedLoginForm/>
        </Card.Body>
      </Card>
    )
  }
}

const DecoratedLoginForm = reduxForm({
  form: 'login',
  onSubmit: submitLogin
})(LoginForm)

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(LoginContainer)
