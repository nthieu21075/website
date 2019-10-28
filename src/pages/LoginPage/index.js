import React, { Component } from 'react'
import { StandaloneFormPage } from 'tabler-react'
import LoginContainer from 'containers/login'
import logo from 'public/images/logo.svg'

class LoginPage extends Component {
  render() {
    return (
      <div className="blackBg">
        <StandaloneFormPage imageURL={logo}>
          <LoginContainer/>
        </StandaloneFormPage>
      </div>
    )
  }
}

export default LoginPage