import React, { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import TournamentDetailContainner from 'containers/organizers/tournaments/tab'
import { updateSideBarActive } from 'services/organizers/global/actions'

const { Content } = Layout

const contentStyled = {
  padding: '24px',
  marginBottom: '24px',
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
  background: '#fff'
}

class TournamentDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(updateSideBarActive('unpublishTour'))
  }

  render() {
    const { match: { params } } = this.props
    return (
      <Content style={contentStyled}>
        <TournamentDetailContainner params={params}/>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(TournamentDetailPage)