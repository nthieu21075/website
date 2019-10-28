import React, { Component } from 'react'
import { Form } from "antd"

const reduxFormField = Component => ({ required, input, meta, children, hasFeedback, label, addonBefore, options, defaultValue, ...rest }) => {
  const hasError = meta.invalid

  return (
    <Form.Item
      required={required}
      label={label}
      validateStatus={ hasError ? 'error' : 'success' }
      hasFeedback={hasFeedback}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} options={options} addonBefore={addonBefore} children={children} />
    </Form.Item>
  )
}

export default reduxFormField
