import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'tabler-react'
import { reduxForm } from 'redux-form'
import { notification } from 'antd'
import LoginForm from 'components/organizers/login'
import { submitLogin } from 'services/referees/authentication/api'
import { initAuthState } from 'services/referees/authentication/actions'

class LoginContainer extends Component {
  componentDidMount() {
    this.props.dispatch(initAuthState())
  }

  render() {
    return (
      <Card statusColor='blue' title='Referees Management'>
        <Card.Body>
          <DecoratedLoginForm/>
        </Card.Body>
      </Card>
    )
  }
}

const DecoratedLoginForm = reduxForm({
  form: 'refereesLoginForm',
  onSubmit: submitLogin
})(LoginForm)

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(LoginContainer)