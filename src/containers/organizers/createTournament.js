import React, { Component } from 'react'
import { Layout, Typography, Pagination } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { notification } from 'antd'
import CreateTournamentForm from 'components/organizers/tournaments/createForm'
import { getCategories } from 'services/organizers/category/api'
import { initMessageState } from 'services/organizers/message/actions'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: '24px',
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#fff'
}

class CreateTournamentContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(reset('origanizerCreateTournamentForm'))
    this.props.dispatch(getCategories())
  }

  componentDidUpdate() {
    const { message: { error, success } } = this.props

    if (error) {
      notification['error']({ message: error })
      this.props.dispatch(initMessageState())
    }

    if (success) {
      notification['success']({ message: success })
      this.props.dispatch(initMessageState())
    }
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Create Tournament</Title>
        <FormDecorator/>
      </Content>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'origanizerCreateTournamentForm',
  destroyOnUnmount: false,
  // onSubmit: createTournament
})(CreateTournamentForm)

FormDecorator = connect(
  (state) => ({
    initialValues: {
      categories: state.organizerCategory.categories
    }
  })
)(FormDecorator)

const mapStateToProps = (state) => ({
  message: state.organizerMessage
})

export default connect(mapStateToProps)(CreateTournamentContainer)