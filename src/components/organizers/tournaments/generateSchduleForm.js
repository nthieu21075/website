import React, { Component } from 'react'
import { Form, Select, Button, Icon } from 'antd'
import { required } from 'redux-form-validators'
import { Field, reduxForm } from 'redux-form'
import reduxAntFormField from 'components/reduxAntFormField'

const { Option } = Select

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
      offset: 10,
    },
    xl: {
      span: 12,
      offset: 10,
    },
  }
}

const GenerateScheduleForm = props => {
  const { handleSubmit, pristine, submitting, initialValues: { scheduleTypeOptions } } = props

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} style={{width: '100%'}}>
      <Field
        hasFeedback
        label='Options'
        name='scheduleType'
        component={reduxAntFormField(Select)}
        validate={[ required() ]}
      >
        {scheduleTypeOptions.map((data, index) => {
          return (<Option value={data.value} key={index}>{data.label}</Option>)
        })}
      </Field>
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' shape='round' loading={submitting} htmlType="submit">
          <Icon type="sync" spin />
          Generate Schedule
        </Button>
      </Form.Item>
    </Form>
  )
}

export default GenerateScheduleForm