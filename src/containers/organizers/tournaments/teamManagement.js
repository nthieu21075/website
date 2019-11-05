import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import updateTeamForm from 'components/organizers/tournaments/updateTeamForm'
import AllTableContainer from 'containers/organizers/tournaments/allTable'
import AllTeamContainer from 'containers/organizers/tournaments/allTeam'

import { updateTeam } from 'services/organizers/tournaments/api'
import { showAlert } from 'helpers/alert'
import { Row, Col } from 'antd'

class TeamManagementContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
  }

  componentDidUpdate() {
    showAlert(this.props)
  }

  render() {
    return (
      <Row>
        <Col span={24}>
          <FormDecorator/>
        </Col>
        <Col span={24}>
          <AllTeamContainer/>
          <AllTableContainer/>
        </Col>
      </Row>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'origanizerSetupTeamForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: updateTeam
})(updateTeamForm)

const ininValueDetault = (state) => {
  const basicInformation = state.organizers.tournamentPage.basicInformation
  let defaultValue = {
    teamNumberOfTable: 0
  }

  if (_.size(basicInformation) > 0) {
    defaultValue = _.merge(defaultValue, {
      teamNumberOfTable: basicInformation.teamNumberOfTable
    })
  }

  return { initialValues: defaultValue }
}

FormDecorator = connect(ininValueDetault)(FormDecorator)

const mapStateToProps = (state) => ({
  message: state.organizers.message
})

export default connect(mapStateToProps)(TeamManagementContainer)