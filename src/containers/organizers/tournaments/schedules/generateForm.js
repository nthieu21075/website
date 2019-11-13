import React, { Component } from 'react'
import { Layout, Typography, Pagination } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import GenerateScheduleForm from 'components/organizers/tournaments/generateSchduleForm'
import { generate } from 'services/organizers/tournaments/schedule/api'

const { Title } = Typography
const { Content } = Layout

class GeneratorContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(reset('generatorScheduleForm'))
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflow: 'scroll', marginBottom: 20 }}>
        <Title level={3} style={{ textAlign: 'center' }}>Schedule</Title>
        <GeneratorDecorator/>
      </div>
    )
  }
}

let GeneratorDecorator = reduxForm({
  form: 'generatorScheduleForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit: generate
})(GenerateScheduleForm)

const ininValueDetault = (state) => {
  const basicInformation = state.organizers.tournamentPage.basicInformation
  const defaultValue= {
    scheduleTypeOptions: [{ value: 'single', label: 'SingleElimination' }, { value: 'roundRobin', label: 'Round Robin' }],
    scheduleType: basicInformation.scheduleType,
    id: basicInformation.id
  }

  return { initialValues: defaultValue }
}

GeneratorDecorator = connect(ininValueDetault)(GeneratorDecorator)

const mapStateToProps = (state) => ({
  basicInformation: state.organizers.tournamentPage.basicInformation
})

export default connect(mapStateToProps)(GeneratorContainer)