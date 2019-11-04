import React, { Component } from 'react'
import { Layout, Typography, Pagination } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { notification } from 'antd'
import CreateTournamentForm from 'components/organizers/tournaments/createForm'
import { getCategories } from 'services/organizers/category/api'
import { initMessageState } from 'services/organizers/message/actions'
import { createTournament } from 'services/organizers/tournaments/api'
import { showAlert } from 'helpers/alert'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: 24,
  marginBottom: 24,
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
    showAlert(this.props)
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
  enableReinitialize: true,
  onSubmit: createTournament
})(CreateTournamentForm)

FormDecorator = connect(
  (state) => ({
    initialValues: {
      categories: state.organizers.categories.data,
      originationDate: []
    }
  })
)(FormDecorator)

const mapStateToProps = (state) => ({
  message: state.organizers.message
})

export default connect(mapStateToProps)(CreateTournamentContainer)