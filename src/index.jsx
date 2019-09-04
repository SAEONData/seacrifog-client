import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import App from './app'
import WebFontLoader from 'webfontloader'
import * as serviceWorker from './serviceWorker'
import './index.scss'

// Configure the Apollo Client
const cache = new InMemoryCache()
const link = new HttpLink({
  uri: process.env.REACT_APP_GQL_ENDPOINT || 'http://localhost:3000/graphql'
})
const client = new ApolloClient({ cache, link })

// Load the fonts
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons']
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
