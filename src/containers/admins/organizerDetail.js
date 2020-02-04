import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import UpdateOrganizerForm from 'components/admins/updateOrganizerForm'
import { updateOrganizer, getOrganizerDetail } from 'services/admins/api'

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

class OrganizerDetailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.props.dispatch(reset('adminUpdateOrganizerForm'))
    this.props.dispatch(getOrganizerDetail(this.props.params.id, (response) => {
      this.setState({ data: response })
    }))
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Organizer Detail</Title>
        <FormDecorator data={this.state.data}/>
      </Content>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'adminUpdateOrganizerForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: updateOrganizer
})(UpdateOrganizerForm)

const ininValueDetault = (state, ownState) => {
  if (ownState.data.id) {
    const data = ownState.data

    return { initialValues: {
        id: data.id,
        organizerName: data.organizerName,
        name: data.name,
        email: data.email,
        address: data.address,
        location: data.location,
        phoneNumber: data.phoneNumber,
        password: ''
      }
    }
  } else {
    return { initialValues: {} }
  }
}

FormDecorator = connect(ininValueDetault)(FormDecorator)

const mapStateToProps = (state, ownState) => ({
})

export default connect(mapStateToProps)(OrganizerDetailContainer)