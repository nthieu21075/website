import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import UpdateRefereeForm from 'components/admins/updateRefereeForm'
import { updateReferee, getRefereeDetail } from 'services/admins/api'

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
    this.props.dispatch(reset('adminUpdateRefereeForm'))
    this.props.dispatch(getRefereeDetail(this.props.params.id, (response) => {
      this.setState({ data: response })
    }))
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Referee Detail</Title>
        <FormDecorator data={this.state.data}/>
      </Content>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'adminUpdateRefereeForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: updateReferee
})(UpdateRefereeForm)

const ininValueDetault = (state, ownState) => {
  if (ownState.data.id) {
    const data = ownState.data

    return { initialValues: {
        id: data.id,
        name: data.name,
        categoryId: data.categoryId,
        email: data.email,
        address: data.address,
        location: data.location,
        phoneNumber: data.phoneNumber,
        categories: state.admins.global.categories,
        price: data.price,
        password: ''
      }
    }
  } else {
    return { initialValues: {categories: state.admins.global.categories} }
  }
}

FormDecorator = connect(ininValueDetault)(FormDecorator)

const mapStateToProps = (state, ownState) => ({
})

export default connect(mapStateToProps)(OrganizerDetailContainer)