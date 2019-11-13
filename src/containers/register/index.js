import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Card } from 'tabler-react'
import { reduxForm } from 'redux-form'
import { required, email, length, confirmation } from 'redux-form-validators'
import { notification } from 'antd'
import { submitRegister } from 'services/users/authentication/api'
import { initAuthState } from 'services/users/authentication/actions'
import RegisterForm from 'components/register/registerForm'

class RegisterContainer extends Component {
  componentDidMount() {
    this.props.dispatch(initAuthState())
  }

  render() {
    return (
      <Card statusColor='blue' title='Register new  Account'>
        <Card.Body>
          <DecoratedLoginForm/>
        </Card.Body>
      </Card>
    )
  }
}

const DecoratedLoginForm = reduxForm({
  form: 'registerForm',
  onSubmit: submitRegister
})(RegisterForm)


const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(RegisterContainer)