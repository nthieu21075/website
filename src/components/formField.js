import React, { Component } from 'react'
import { Form } from 'tabler-react'

const FormField = ({input, label, type, meta: { asyncValidating, touched, error }}) => {
  let className = "form-control"

  if (touched && error) {
    className += " is-invalid state-invalid"
  } else {
    className = "form-control"
  }

  return (
    <Form.Group label={label} isRequired>
      <input {...input} type={type} placeholder={label} className={className}/>
      {touched && error && <span className="invalid-feedback">{error}</span>}
    </Form.Group>
  )
}

export default FormField