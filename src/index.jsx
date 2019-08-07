import React from 'react'
import ReactDOM from 'react-dom'
import App from './modules/app'
import WebFontLoader from 'webfontloader'
import * as serviceWorker from './serviceWorker'
import './index.scss'

// Load the fonts
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons']
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
