import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Form, Button } from 'tabler-react'
import { Field } from 'redux-form'
import { required, email, length, confirmation } from 'redux-form-validators'
import FormField from '../formField'

class RegisterForm extends Component {
  render() {
    const { submitting, handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="name"
          type="text"
          component={FormField}
          label="Name"
          validate={[ required() ]}
        />
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
        <Field
          type="password"
          name="confirmPassword"
          component={FormField}
          label="Confirmation"
          validate={[ required(), length({ min: 6 }), confirmation({ field: 'password', fieldLabel: 'Password' }) ]}
        />
        <Form.Footer>
          <Button pill block color='primary' type='submit' disabled={submitting}>
            {submitting ? 'Submitting...' : 'Create'}
          </Button>
          <Link to='/'><Button block link>{'<< Back to home'}</Button></Link>
          <Link to='/login'><Button block link>Login</Button></Link>
        </Form.Footer>
      </Form>
    )
  }
}

export default RegisterForm