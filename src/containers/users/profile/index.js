import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileInfoForm from 'components/users/profile/profileForm'
import ChangePasswordForm from 'components/users/profile/changePasswordForm'
import ProfileMenu from 'components/users/profile/menu'
import ListTournament from 'components/users/listTournament'
import { Layout, Breadcrumb, Typography, Pagination, Row, Col } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { tournamentData } from 'global/fakeData'
import { updateProfile, updatePassword } from 'services/users/profile/api'
import { getPendingRequest } from 'services/users/profile/pendingRequest/api'
import ListPendingRequest from 'components/users/listPendingRequest'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: '10px 24px',
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}

const profileContent = () => (
  <Content style={contentStyled}>
    <Title level={3} style={{ textAlign: 'center' }}>My profile</Title>
    <ProfileInfoFormDecorator/>
  </Content>
)

const changePasswordContent = () => (
  <Content style={contentStyled}>
    <Title level={3} style={{ textAlign: 'center' }}>Change Password</Title>
    <ChangePasswordFormDecorator/>
  </Content>
)

const MyTournamentContent = (pendingRequests) => {
  let data = pendingRequests.loading ? tournamentData : pendingRequests.data

  return (
    <Content style={contentStyled}>
      <Title level={3} style={{ textAlign: 'center' }}>Pending Request to Join Tournament</Title>
      <Row type="flex" justify="center">
        <Col span='24'>
          <ListPendingRequest
            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2 , xxl: 2}}
            loading={pendingRequests.loading}
            bordered={true}
            data={data}
          />
        </Col>
      </Row>
    </Content>
  )
}

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedItem: 'profile' }
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(reset('changePasswordForm'))
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    this.setState({ selectedItem: key })
    if (key == 'tournament:pending') {
      this.props.dispatch(getPendingRequest())
    }
  }

  render() {
    const { pendingRequests, userAuth } = this.props

    const { selectedItem } = this.state
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0 0 0', background: '#fff' }}>
          <ProfileMenu onClick={this.onClickMenuItem} userAuth={userAuth}/>
          {selectedItem == 'profile' && profileContent()}
          {selectedItem == 'changePassword' && changePasswordContent()}
          {selectedItem == 'tournament:rejected' && MyTournamentContent(pendingRequests)}
          {selectedItem == 'tournament:pending' && MyTournamentContent(pendingRequests)}
          {selectedItem == 'tournament:happening' && MyTournamentContent(pendingRequests)}
        </Layout>
      </Content>
    )
  }
}

let ProfileInfoFormDecorator = reduxForm({
  form: 'profileForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit: updateProfile
})(ProfileInfoForm)

const ChangePasswordFormDecorator = reduxForm({
  form: 'changePasswordForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit: updatePassword
})(ChangePasswordForm)

ProfileInfoFormDecorator = connect(
  (state) => {
    const user =  state.users.auth.data
    return ({
      initialValues: {
        email: user.email,
        name: user.name,
        address: user.address,
        phoneNumber: user.phoneNumber,
        location: user.location
      }
    })
  }
)(ProfileInfoFormDecorator)

const mapStateToProps = (state) => ({
  userAuth: state.users.auth.data,
  pendingRequests: state.users.pendingRequests,
})

export default connect(mapStateToProps)(ProfileContainer)