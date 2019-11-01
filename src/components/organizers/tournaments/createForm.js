import React, { Component } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
  Upload
} from 'antd'

import { required, numericality } from 'redux-form-validators'
import { Field, reduxForm } from 'redux-form'
import reduxAntFormField from 'components/reduxAntFormField'
import AntUploadFormField from 'components/reduxAntUploadField'

const { Option } = Select;
const { TextArea } = Input

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

const CreateForm = ({ handleSubmit, pristine, submitting, initialValues: {categories} }) => {
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} style={{width: '100%'}}>
      <Field
        hasFeedback
        required={true}
        label="Name"
        name="name"
        component={reduxAntFormField(Input)}
        placeholder="Name"
        validate={[ required() ]}
      />
      <Field
        hasFeedback
        required={true}
        label="Team Number"
        name="team"
        component={reduxAntFormField(Input)}
        placeholder="Team Number"
        validate={[ required(), numericality() ]}
      />
      <Field
        hasFeedback
        required={true}
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
      <Field
        label="Short Description"
        name="shortDescription"
        component={reduxAntFormField(Input)}
        placeholder="Short Description"
      />
      <Field
        label="Description"
        name="description"
        component={reduxAntFormField(TextArea)}
        placeholder="Description"
        validate={[]}
      />
      <AntUploadFormField
        label="Image"
        name="image"
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" loading={submitting} htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}

export default CreateForm