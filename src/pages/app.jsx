import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from '../modules/layout'
import Dashboard from './dashboard'
import EssentialVariables from './variables'
import ObservationInfrastructure from './observation-infrastructure'
import DataProducts from './data-products'
import Protocols from './protocols'
import About from './about'
import GqlExample from './gql-example'

// Configure the Apollo Client
const cache = new InMemoryCache()
const link = new HttpLink({
  uri: process.env.REACT_APP_GQL_ENDPOINT || 'http://localhost:3000/graphql'
})
const client = new ApolloClient({ cache, link })

// Specify the items in the side menu
const navItems = [
  {
    exact: true,
    label: 'Dashboard',
    to: '/',
    icon: 'dashboard',
    nestedItems: false
  },
  {
    exact: true,
    label: 'Variables',
    to: '/variables',
    icon: 'group_work',
    nestedItems: false
  },
  {
    exact: true,
    label: 'Observation Infrastructure',
    to: '/observation-infrastructure',
    icon: 'track_changes',
    nestedItems: false
  },
  {
    exact: true,
    label: 'Data Products',
    to: '/data-products',
    icon: 'timeline',
    nestedItems: false
  },
  {
    exact: true,
    label: 'Protocols',
    to: '/protocols',
    icon: 'touch_app',
    nestedItems: false
  },
  {
    exact: true,
    label: 'About',
    to: '/about',
    icon: 'info',
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
        <Route
          key={'route-to-home'}
          path={'/'}
          exact={true}
          component={Dashboard}
        />
        <Route
          key={'route-to-essential'}
          path={'/variables'}
          exact={true}
          component={EssentialVariables}
        />
        <Route
          key={'route-to-observation'}
          path={'/observation-infrastructure'}
          exact={true}
          component={ObservationInfrastructure}
        />
        <Route
          key={'route-to-data'}
          path={'/data-products'}
          exact={true}
          component={DataProducts}
        />
        <Route
          key={'route-to-protocols'}
          path={'protocols'}
          exact={true}
          component={Protocols}
        />
        <Route
          key={'route-to-about'}
          path={'/about'}
          exact={true}
          component={About}
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
