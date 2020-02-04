import React, { Component } from 'react'
import { Form } from "antd"

const reduxFormField = Component => ({ required, input, meta, children, hasFeedback, label, addonBefore, options, defaultValue, dateFormat, defaultChecked, ...rest }) => {
  const hasError = meta.invalid && meta.error && meta.touched

  if (defaultValue) {
    rest.defaultValue = defaultValue
  }

  if (dateFormat) {
    rest.format = dateFormat
  }

  if (defaultChecked) {
    rest.defaultChecked = defaultChecked
    rest.checked = defaultChecked
  }

  if (rest.type == 'hidden') {
    return (
      <Component {...input} {...rest} options={options} rows={4} children={children} />
    )
  }

  return (
    <Form.Item
      required={required}
      label={label}
      validateStatus={ hasError ? 'error' : '' }
      hasFeedback={hasFeedback}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} options={options} rows={4} children={children} />
    </Form.Item>
  )
}

export default reduxFormField
