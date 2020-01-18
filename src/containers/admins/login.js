import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'tabler-react'
import { reduxForm } from 'redux-form'
import { notification } from 'antd'
import LoginForm from 'components/organizers/login'
import { submitLogin } from 'services/admins/authentication/api'
import { initAuthState } from 'services/admins/authentication/actions'

class LoginContainer extends Component {
  componentDidMount() {
    this.props.dispatch(initAuthState())
  }

  render() {
    return (
      <Card statusColor='blue' title='Admin Management'>
        <Card.Body>
          <DecoratedLoginForm/>
        </Card.Body>
      </Card>
    )
  }
}

const DecoratedLoginForm = reduxForm({
  form: 'adminsLoginForm',
  onSubmit: submitLogin
})(LoginForm)

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(LoginContainer)