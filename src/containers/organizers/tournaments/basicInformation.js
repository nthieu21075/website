import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import UpdateForm from 'components/organizers/tournaments/updateForm'
import { getTournament } from 'services/organizers/tournaments/api'
import { getCategories } from 'services/organizers/category/api'
import { updateTournament } from 'services/organizers/tournaments/api'
import { showAlert } from 'helpers/alert'

class BasicInformationContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
    dispatch(reset('origanizerUpdateTournamentForm'))
    dispatch(getCategories())
    dispatch(getTournament(params.id))
  }

  componentDidUpdate() {
    showAlert(this.props)
  }

  render() {
    return (
      <FormDecorator/>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'origanizerUpdateTournamentForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  // onSubmit: updateTournament
})(UpdateForm)


const ininValueDetault = (state) => {
  const basicInformation = state.organizers.tournamentPage.basicInformation
  const categories = state.organizers.categories
  let defaultValue = {
    categories: categories.data,
    originationDate: [],
    imageUrl: ''
  }

  if (_.size(basicInformation) > 0) {
    defaultValue = _.merge(defaultValue, {
      name: basicInformation.name,
      originationDate: [moment(basicInformation.startDate),  moment(basicInformation.endDate)],
      categoryId: basicInformation.category.id,
      team: basicInformation.team,
      shortDescription: basicInformation.shortDescription,
      description: basicInformation.description,
      imageUrl: basicInformation.imageUrl
    })
  }

  return { initialValues: defaultValue }
}

FormDecorator = connect(ininValueDetault)(FormDecorator)

const mapStateToProps = (state) => ({
  message: state.organizers.message
})

export default connect(mapStateToProps)(BasicInformationContainer)