import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './modules/layout'
import Dashboard from './pages/dashboard'
import EssentialVariables from './pages/variables'
import ObservationInfrastructure from './pages/observation-infrastructure'
import DataProducts from './pages/data-products'
import Protocols from './pages/protocols'
import About from './pages/about'

// Specify the items in the side menu
const navItems = [
  {
    exact: true,
    label: 'Dashboard',
    to: '/',
    icon: 'dashboard'
  },
  {
    exact: true,
    label: 'Variables',
    to: '/variables',
    icon: 'group_work'
  },
  {
    exact: true,
    label: 'Observation Infrastructure',
    to: '/observation-infrastructure',
    icon: 'track_changes'
  },
  {
    exact: true,
    label: 'Data Products',
    to: '/data-products',
    icon: 'timeline'
  },
  {
    exact: true,
    label: 'Protocols',
    to: '/protocols',
    icon: 'touch_app'
  },
  {
    exact: true,
    label: 'About',
    to: '/about',
    icon: 'info'
  }
  // {key: 'nav-divider-1', divider: true, style: {margin: 0}}
]
// SPA wrapper
const App = () => (
  <BrowserRouter>
    <Navigation navItems={navItems}>
      <Route key={'route-to-home'} path={'/'} exact={true} component={Dashboard} />
      <Route key={'route-to-essential'} path={'/variables'} exact={true} component={EssentialVariables} />
      <Route key={'route-to-observation'} path={'/observation-infrastructure'} exact={true} component={ObservationInfrastructure} />
      <Route key={'route-to-data'} path={'/data-products'} exact={true} component={DataProducts} />
      <Route key={'route-to-protocols'} path={'/protocols'} exact={true} component={Protocols} />
      <Route key={'route-to-about'} path={'/about'} exact={true} component={About} />
    </Navigation>
  </BrowserRouter>
)

export default App
