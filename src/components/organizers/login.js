import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Form, Button } from 'tabler-react'
import { Field } from 'redux-form'
import { required, email, length } from 'redux-form-validators'
import FormField from '../formField'

class LoginForm extends Component {
  render() {
    const { submitting, handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="email"
          component={FormField}
          label="Email Address"
          validate={[ required(), email() ]}
        />
        <Field
          type="password"
          name="password"
          component={FormField}
          label="Password"
          validate={[ required(), length({ min: 6 }) ]}
        />
        <Form.Footer>
          <Button pill block color='primary' type='submit' disabled={submitting}>
            {submitting ? 'Submitting...' : 'Login'}
          </Button>
        </Form.Footer>
      </Form>
    )
  }
}

export default LoginForm