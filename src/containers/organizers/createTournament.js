import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import CreateTournamentForm from 'components/organizers/tournaments/createForm'
import { getCategories } from 'services/organizers/category/api'
import { createTournament } from 'services/organizers/tournaments/api'

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
      originationDate: [],
      categoryId: state.organizers.categories.data.length > 0 ? state.organizers.categories.data[0].id : 0
    }
  })
)(FormDecorator)

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(CreateTournamentContainer)