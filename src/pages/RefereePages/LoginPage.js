import React, { Component } from 'react'
import { StandaloneFormPage } from 'tabler-react'
import LoginContainer from 'containers/referees/login'
import logo from 'public/images/logo.svg'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/refereeAlert'

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
  message: state.referee.message
})


export default connect(mapStateToProps)(LoginPage)