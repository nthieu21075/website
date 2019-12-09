import React, { Component } from 'react'
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
} from 'antd'

import { required } from 'redux-form-validators'
import { Field, reduxForm } from 'redux-form'
import reduxAntFormField from 'components/reduxAntFormField'
import AntUploadFormField from 'components/reduxAntUploadField'

const { Option } = Select

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

const CreateTeamForm = props => {
  const { handleSubmit, pristine, submitting, initialValues: {categories}, dirty } = props

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} style={{width: '100%'}}>
      <Field
        hasFeedback
        required={true}
        label="Team Name "
        name="name"
        component={reduxAntFormField(Input)}
        placeholder="Team name"
        validate={[ required() ]}
      />
      <Field
        hasFeedback
        label="Category"
        name="categoryId"
        component={reduxAntFormField(Select)}
        placeholder="Category"
        validate={[ required() ]}
      >
        {categories.map((data, index) => {
          return (<Option value={data.id} key={index}>{data.name}</Option>)
        })}
      </Field>
      <AntUploadFormField
        label="Logo"
        name="logo"
        dirty={dirty}
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" disabled={submitting} htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}

export default CreateTeamForm