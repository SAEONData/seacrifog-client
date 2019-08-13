import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './layout'
import Home from './home'
import GqlExample from './gql-example'

// Configure the Apollo Client
const cache = new InMemoryCache()
const link = new HttpLink({ uri: 'http://localhost:3000/graphql' })
const client = new ApolloClient({ cache, link })

// Specify the items in the side menu
const navItems = [
  {
    exact: true,
    label: 'Home',
    to: '/',
    icon: 'home',
    nestedItems: false
  },
  // {key: 'nav-divider-1', divider: true, style: {margin: 0}},
  {
    exact: true,
    label: 'GQL',
    to: '/gqlexample',
    icon: 'mood',
    nestedItems: false
  }
]

// SPA wrapper
const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Navigation navItems={navItems}>
        <Route key={'route-to-home'} path={'/'} exact={true} component={Home} />
        <Route
          key={'route-to-home'}
          path={'/home'}
          exact={true}
          component={Home}
        />
        <Route
          key={'route-to-gql-test'}
          path={'/gqlexample'}
          exact={true}
          component={GqlExample}
        />
      </Navigation>
    </ApolloProvider>
  </BrowserRouter>
)

export default App
