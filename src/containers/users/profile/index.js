import React, { Component } from 'react'
import ProfileInfoForm from 'components/users/profile/profileForm'
import ChangePasswordForm from 'components/users/profile/changePasswordForm'
import ProfileMenu from 'components/users/profile/menu'
import ListTournament from 'components/users/listTournament'
import { Layout, Breadcrumb, Typography, Pagination } from 'antd'
import { reduxForm } from 'redux-form'
import { tournamentData } from 'global/fakeData'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: '10px 24px',
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center'
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

const MyTournamentContent = () => (
  <Content style={contentStyled}>
    <Title level={3} style={{ textAlign: 'center' }}>Pending Tournament</Title>
    <ListTournament
      grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3}}
      loading={false}
      bordered={true}
      data={tournamentData}
    />
    <Pagination defaultCurrent={1} total={50} />
  </Content>
)

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedItem: 'profile' }
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    this.setState({ selectedItem: key })
  }

  render() {
    const { selectedItem } = this.state
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0 0 0', background: '#fff' }}>
          <ProfileMenu onClick={this.onClickMenuItem}/>
          {selectedItem == 'profile' && profileContent()}
          {selectedItem == 'changePassword' && changePasswordContent()}
          {selectedItem == 'tournament:rejected' && MyTournamentContent()}
          {selectedItem == 'tournament:pending' && MyTournamentContent()}
          {selectedItem == 'tournament:happening' && MyTournamentContent()}
        </Layout>
      </Content>
    )
  }
}

const ProfileInfoFormDecorator = reduxForm({
  form: 'profileForm',
  enableReinitialize: true,
  initialValues: {
    email: "b@b.com",
    name: "Jack Ly",
  }
})(ProfileInfoForm)

const ChangePasswordFormDecorator = reduxForm({
  form: 'changePasswordForm',
})(ChangePasswordForm)



export default ProfileContainer