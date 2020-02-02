import React, { Component } from 'react'
import { Row, Col, List, Typography } from 'antd'
import TournamentItem from 'components/users/tournamentItem'
import ApplyTourmanentModal from 'containers/users/tournaments/applyForm'
import Slider from "react-slick"
import _ from 'lodash'
import { connect } from 'react-redux'
import { getTournaments } from 'services/users/tournaments/api'
import ListTournament from 'components/users/listTournament'

const { Title } = Typography

class NewestTournamentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { categoryId: null, showJoinModal: false, tournamentId: 0 }
    this.joinTournament = this.joinTournament.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  joinTournament(categoryId, tournamentId) {
    this.setState({ showJoinModal: true, categoryId: categoryId, tournamentId: tournamentId })
  }

  onCancel() {
    this.setState({ showJoinModal: false, categoryId: 0, tournamentId: 0 })
  }

  componentDidMount() {
    this.props.dispatch(getTournaments('recomended'))
  }

  render() {
    const { title, autoPlay, infinite, slidesToShow, tournaments } = this.props
    const { showJoinModal, categoryId, tournamentId } = this.state

    return (
      <div style={{ margin: '30px 0' }}>
        <Row type="flex" justify="center">
          <Title level={2}>{title}</Title>
        </Row>
        <Row type="flex" justify="center">
          <Col xs={{span: 23}} md={{span: 22}} sm={{span: 22}} lg={{span: 22}} xl={{span: 24}} style={{ paddingBottom: '100px' }}>
            <ListTournament
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4 , xxl: 4}}
              loading={false}
              bordered={true}
              data={tournaments}
              joinTournament={this.joinTournament}
            />
          </Col>
        </Row>
        <ApplyTourmanentModal
          visible={showJoinModal}
          categoryId={categoryId}
          tournamentId={tournamentId}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tournaments: state.users.tournaments.recommend
})

export default connect(mapStateToProps)(NewestTournamentContainer)