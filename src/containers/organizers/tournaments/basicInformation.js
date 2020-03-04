import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import UpdateForm from 'components/organizers/tournaments/updateForm'
import { getBasicInformation } from 'services/organizers/tournaments/api'
import { getCategories } from 'services/organizers/category/api'
import { updateTournament } from 'services/organizers/tournaments/api'

class BasicInformationContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
    dispatch(getCategories())
    dispatch(getBasicInformation(params.id))
  }

  componentDidUpdate() {
    const { dispatch, params } = this.props
    dispatch(getCategories())
    dispatch(getBasicInformation(params.id))
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
  onSubmit: updateTournament
})(UpdateForm)

const dateFormat = 'DD/MM/YYYY'

const ininValueDetault = (state) => {
  const basicInformation = state.organizers.tournamentPage.basicInformation
  const categories = state.organizers.categories
  let defaultValue = {
    categories: categories.data,
    originationDate: [],
    imageUrl: '',
    publish: false
  }

  if (_.size(basicInformation) > 0) {
    const startDate = moment(basicInformation.startDate).format(dateFormat)
    const endDate = moment(basicInformation.endDate).format(dateFormat)

    console.log('startDate', startDate)
    console.log('endDate', endDate)

    defaultValue = _.merge(defaultValue, {
      publish: basicInformation.publish,
      id: basicInformation.id,
      name: basicInformation.name,
      originationDate: [moment(startDate, dateFormat), moment(endDate, dateFormat)],
      categoryId: basicInformation.category.id,
      team: basicInformation.team,
      teamOfTable: basicInformation.teamOfTable,
      shortDescription: basicInformation.shortDescription,
      description: basicInformation.description,
      imageUrl: basicInformation.imageUrl
    })
  }

  return { initialValues: defaultValue }
}

FormDecorator = connect(ininValueDetault)(FormDecorator)

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(BasicInformationContainer)