import React, { Component } from 'react'
import { StandaloneFormPage } from 'tabler-react'
import RegisterContainer from 'containers/register'
import logo from 'public/images/logo.svg'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/userAlert'

class RegisterPage extends Component {
  componentDidUpdate() {
    showAlert(this.props)
  }

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

const mapStateToProps = (state) => ({
  message: state.users.message
})


export default connect(mapStateToProps)(RegisterPage)