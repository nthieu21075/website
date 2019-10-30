import React, { Component } from 'react'
import { Form, Input, Button,} from 'antd'
import { required, length, confirmation } from 'redux-form-validators'
import { Field, reduxForm } from 'redux-form'
import reduxAntFormField from 'components/reduxAntFormField'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    xl: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    xl: { span: 16 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 11,
    },
  }
}


const ChangePasswordForm = props => {
  const { handleSubmit, pristine, submitting } = props

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} style={{width: '100%'}}>
      <Field
        hasFeedback
        required={true}
        label="Current Password"
        name="currentPassword"
        type="password"
        component={reduxAntFormField(Input)}
        placeholder="Current Password"
        validate={[ required(), length({ min: 6 }) ]}
      />
      <Field
        hasFeedback
        required={true}
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        component={reduxAntFormField(Input)}
        placeholder="Confirm Password"
        validate={[ required(), length({ min: 6 }), confirmation({ field: 'currentPassword', fieldLabel: 'Current Password' }) ]}
      />
      <Field
        hasFeedback
        required={true}
        label="New Password"
        name="newPassword"
        type="password"
        component={reduxAntFormField(Input)}
        placeholder="New Password"
        validate={[ required(), length({ min: 6 }) ]}
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" disabled={pristine || submitting} htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}

export default ChangePasswordForm