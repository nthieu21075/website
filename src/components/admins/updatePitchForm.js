import React, { Component } from 'react'
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Button,
  AutoComplete,
  Typography
} from 'antd'

import { required, email, numericality, length, confirmation } from 'redux-form-validators'
import { Field, reduxForm } from 'redux-form'
import reduxAntFormField from 'components/reduxAntFormField'
import AntUploadFormField from 'components/reduxAntUploadField'
import {residences} from 'global/fakeData'

const { Option } = Select;

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

const UpdatePitchForm = ({ handleSubmit, pristine, submitting, initialValues: {categories, imageUrl} }) => {

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} style={{width: '100%'}}>
      <Field
        label="id"
        name="id"
        component={reduxAntFormField(Input)}
        type="hidden"
      />
      <Field
        hasFeedback
        required={true}
        label="Pitch Name"
        name="name"
        component={reduxAntFormField(Input)}
        placeholder="Pitch Name"
        validate={[ required() ]}
      />
      <Field
        hasFeedback
        required={true}
        label="Owner Name"
        name="ownerName"
        component={reduxAntFormField(Input)}
        placeholder="Owner Name"
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
      <Field
        hasFeedback
        required={true}
        label="Price"
        name="price"
        component={reduxAntFormField(Input)}
        placeholder="Price"
        validate={[ required(), numericality() ]}
      />
      <Field
        hasFeedback
        required={true}
        label="Address"
        name="address"
        component={reduxAntFormField(Input)}
        placeholder="Address"
        validate={[ required() ]}
      />
      <Field
        hasFeedback
        required={true}
        label="City/District"
        name="location"
        options={residences}
        component={reduxAntFormField(Cascader)}
        placeholder="City/District"
        validate={[ required() ]}
      />
      <Field
        hasFeedback
        required={true}
        label="Phone Number"
        name="phoneNumber"
        component={reduxAntFormField(Input)}
        placeholder="Phone Number"
        validate={[ required(), numericality() ]}
      />
      <AntUploadFormField
        label="Image"
        name="image"
        defaultImageUrl={imageUrl}
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" loading={submitting} htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}

export default UpdatePitchForm