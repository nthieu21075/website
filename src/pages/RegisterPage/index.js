import React, { Component } from 'react'
import { StandaloneFormPage } from 'tabler-react'
import RegisterContainer from 'containers/register'
import logo from 'public/images/logo.svg'

class RegisterPage extends Component {
  render() {
    return (
      <div className="blackBg">
        <StandaloneFormPage imageURL={logo}>
          <RegisterContainer/>
        </StandaloneFormPage>
      </div>
    )
  }
}

export default RegisterPage