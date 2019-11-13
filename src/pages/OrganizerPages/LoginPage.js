import React, { Component } from 'react'
import { StandaloneFormPage } from 'tabler-react'
import LoginContainer from 'containers/organizers/login'
import logo from 'public/images/logo.svg'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'

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
  message: state.organizers.message
})


export default connect(mapStateToProps)(LoginPage)