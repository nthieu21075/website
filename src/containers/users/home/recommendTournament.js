import React, { Component } from 'react'
import { Row, Col, List, Typography } from 'antd'
import TournamentItem from 'components/users/tournamentItem'
import ApplyTourmanentModal from 'containers/users/tournaments/applyForm'
import Slider from "react-slick"
import _ from 'lodash'
import { connect } from 'react-redux'
import { getTournaments } from 'services/users/tournaments/api'

const settings = {
  speed: 1500,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

const { Title } = Typography

class RecommendTournamentContainer extends Component {
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
    settings['autoplay'] = autoPlay
    settings['infinite'] = infinite
    settings['slidesToShow'] = slidesToShow

    return (
      <div style={{ margin: '30px 0' }}>
        <Row type="flex" justify="center">
          <Title level={2}>{title}</Title>
        </Row>
        <Slider {...settings}>
          {_.map(tournaments, (item, index) => {
            return <TournamentItem key={index} item={item} loading={false} bordered={true} className={'carousel-item-padding'} joinTournament={this.joinTournament}/>
          })}
        </Slider>
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

export default connect(mapStateToProps)(RecommendTournamentContainer)