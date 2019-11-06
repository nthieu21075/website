import React, { Component } from 'react'
import { Result, Button } from 'antd'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

class ErrorPage extends Component {
  render() {
    const { status, title, message, authentication } = this.props
    let link = '/'
    let linkText = 'Back Home'

    if (authentication && authentication.user.type == 'organizer') {
      link = '/organizer'
    }

    return (
      <Result
        status={status}
        title={title}
        subTitle={message}
        extra={
          <Button type="primary">
            <Link to={link}>{linkText}</Link>
          </Button>
        }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.authentication
})

export default connect(mapStateToProps)(ErrorPage)