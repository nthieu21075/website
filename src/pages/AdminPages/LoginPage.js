import React, { Component } from 'react'
import { StandaloneFormPage } from 'tabler-react'
import LoginContainer from 'containers/admins/login'
import logo from 'public/images/logo.svg'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/adminAlert'

class LoginPage extends Component {
  componentDidUpdate() {
    showAlert(this.props)
  }

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

const mapStateToProps = (state) => ({
  message: state.admins.message
})


export default connect(mapStateToProps)(LoginPage)