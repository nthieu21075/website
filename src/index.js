import 'tabler-react/dist/Tabler.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import 'antd/dist/antd.css'
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
