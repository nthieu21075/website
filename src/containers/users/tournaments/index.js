import React, { Component } from 'react'
import ProfileInfoForm from 'components/users/profile/profileForm'
import ChangePasswordForm from 'components/users/profile/changePasswordForm'
import Menu from 'components/users/tournaments/menu'
import ListTournament from 'components/users/listTournament'
import { Layout, Breadcrumb, Typography, Pagination } from 'antd'
import { tournamentData, tournamentCategories } from 'global/fakeData'

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

class TournamentsContainer extends Component {
  render() {
    return (
      <Content>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Tournaments</Breadcrumb.Item>
          <Breadcrumb.Item>Sports</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '0', background: '#fff' }}>
          <Menu items={tournamentCategories}/>
          <Content style={contentStyled}>
            <Title level={3} style={{ textAlign: 'center' }}>Tournaments</Title>
            <ListTournament
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4}}
              loading={false}
              bordered={true}
              data={tournamentData}
            />
            <Pagination defaultCurrent={1} total={50} />
          </Content>
        </Layout>
      </Content>
    )
  }
}

export default TournamentsContainer