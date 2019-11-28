import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileInfoForm from 'components/users/profile/profileForm'
import ChangePasswordForm from 'components/users/profile/changePasswordForm'
import Menu from 'components/users/tournaments/menu'
import ListTournament from 'components/users/listTournament'
import { Layout, Breadcrumb, Typography, Pagination } from 'antd'
import { tournamentData, tournamentCategories } from 'global/fakeData'
import Navigator from 'helpers/history'
import { getTournaments } from 'services/users/tournaments/api'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: '10px 24px',
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}

class TournamentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { categoryId: null }
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
  }

  onClickMenuItem({ item, key, keyPath, selectedKeys, domEvent }) {
    Navigator.push('/tournaments/' + key)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.categoryId != nextProps.params.categoryId) {
      this.setState({ categoryId: nextProps.params.categoryId })
      this.props.dispatch(getTournaments(nextProps.params.categoryId))
    }
  }

  render() {
    const { categories, params, tournaments } = this.props
    const activeMenu = [params.categoryId]

    return (
      <Content>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Categories</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '0', background: '#fff' }}>
          <Menu items={categories} activeMenu={activeMenu} onClick={this.onClickMenuItem}/>
          <Content style={contentStyled}>
            <Title level={3} style={{ textAlign: 'center', marginTop: 20 }}>Tournaments</Title>
            {
              tournaments.length == 0 ?
              (<Title level={4} style={{ textAlign: 'center' }}>There are no tournaments found</Title>) : (<ListTournament
                grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3}}
                loading={false}
                bordered={true}
                data={tournaments}
              />)
            }
          </Content>
        </Layout>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.users.categories.data,
  tournaments: state.users.tournaments.data,
})

export default connect(mapStateToProps)(TournamentsContainer)