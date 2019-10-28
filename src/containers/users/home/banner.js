import React, { Component } from 'react'
import { Carousel } from 'antd'
import banner_1 from 'public/images/banner_1.jpg'
import banner_2 from 'public/images/banner_2.jpg'
import banner_3 from 'public/images/banner_3.jpeg'

class BannerContainer extends Component {
  render() {
    return (
      <Carousel autoplay dotPosition='left' effect="fade">
        <img src={banner_1}/>
        <img src={banner_2}/>
        <img src={banner_3}/>
      </Carousel>
    )
  }
}
export default BannerContainer