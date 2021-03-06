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

import { required, email, numericality } from 'redux-form-validators'
import { Field, reduxForm } from 'redux-form'
import reduxAntFormField from 'components/reduxAntFormField'
import {residences} from 'global/fakeData'

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

const prefixSelector = () => (
 <Select defaultValue="86" style={{ width: 70 }}>
   <Option value="86">+86</Option>
   <Option value="87">+87</Option>
 </Select>
)

const RegistrationForm = props => {
  const { handleSubmit, pristine, submitting, initialValues: {location} } = props

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} style={{width: '100%'}}>
      <Field
        hasFeedback
        required={true}
        label="Email Address"
        name="email"
        component={reduxAntFormField(Input)}
        placeholder="Email Address"
        validate={[ required(), email() ]}
      />
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
        defaultValue={location}
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
        addonBefore={prefixSelector()}
        component={reduxAntFormField(Input)}
        placeholder="Phone Number"
        validate={[ required(), numericality() ]}
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" disabled={submitting} htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}

export default RegistrationForm