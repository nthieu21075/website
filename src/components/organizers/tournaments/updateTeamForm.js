import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd'

import { required, numericality } from 'redux-form-validators'
import { Field, reduxForm } from 'redux-form'
import reduxAntFormField from 'components/reduxAntFormField'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    xl: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    xl: { span: 10 }
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
      offset: 12,
    },
    xl: {
      span: 12,
      offset: 12,
    },
  }
}

const updateTeamForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} style={{width: '100%'}}>
      <Field
        hasFeedback
        label="Number Team in table"
        name="teamNumberOfTable"
        component={reduxAntFormField(Input)}
        placeholder="Number Team in table"
        validate={[ required(), numericality() ]}
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" loading={submitting} htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}

export default updateTeamForm