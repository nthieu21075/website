import React, { Component } from 'react'
import { Row, Col, List, Typography } from 'antd'
import TournamentItem from 'components/users/tournamentItem'
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
  componentDidMount() {
    this.props.dispatch(getTournaments('recomended'))
  }

  render() {
    const { title, autoPlay, infinite, slidesToShow, tournaments } = this.props
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
            return <TournamentItem key={index} item={item} loading={false} bordered={true} className={'carousel-item-padding'}/>
          })}
        </Slider>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tournaments: state.users.tournaments.recommend
})

export default connect(mapStateToProps)(RecommendTournamentContainer)