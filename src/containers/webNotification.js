import React, {Component} from 'react'
import Notification from 'react-web-notification'
import { connect } from 'react-redux'

class WebBrowserNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ignore: true,
      title: ''
    }
  }

  handlePermissionGranted() {
    console.log('Permission Granted')
    this.setState({
      ignore: false
    })
  }
  handlePermissionDenied() {
    console.log('Permission Denied')
    this.setState({
      ignore: true
    })
  }
  handleNotSupported() {
    this.setState({
      ignore: true
    })
  }

  handleNotificationOnClick(e, tag) {
  }

  handleNotificationOnError(e, tag) {
  }

  handleNotificationOnClose(e, tag) {
  }

  handleNotificationOnShow(e, tag) {
    this.playSound()
  }

  playSound(filename) {
    document.getElementById('sound').play()
  }

  render() {
    const { webNotification } = this.props

    const options = {
      tag: Date.now(),
      body: webNotification.message,
      icon: 'http://localhost:3000/images/Notifications_button_24.png',
      lang: 'en',
      dir: 'ltr',
      sound: 'http://localhost:3000/sound/sound.mp3'
    }
    const title = webNotification.title ? webNotification.title : ''

    return (
      <div>
        <Notification
          ignore={title === ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={7000}
          title={title}
          options={options}
        />
        <audio id='sound' preload='auto'>
          <source src='http://localhost:3000/sound/sound.mp3' type='audio/mpeg' />
          <source src='http://localhost:3000/sound/sound.ogg' type='audio/ogg' />
          <embed hidden='true' loop='false' src='sound/sound.mp3' />
        </audio>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(WebBrowserNotification)
