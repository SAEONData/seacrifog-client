import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './layout'

// Configure the Apollo Client
const cache = new InMemoryCache()
const link = new HttpLink({ uri: 'http://localhost:3000/graphql' })
const client = new ApolloClient({ cache, link })

// SPA wrapper
const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  </BrowserRouter>
)

export default App
