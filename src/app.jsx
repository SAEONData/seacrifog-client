import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './modules/layout'
import navItems from './nav-items'

import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'

import Dashboard from './pages/dashboard'
import SelectorTool from './pages/selector-tool'
import Atlas from './pages/atlas'

import Variables from './pages/variables'
import Protocols from './pages/protocols'
import DataProducts from './pages/data-products'

// SPA wrapper
const App = () => (
  <BrowserRouter>
    <Navigation navItems={navItems}>
      {/* Basic navigation */}
      <Route key={'route-to-home'} path={'/'} exact={true} component={Home} />
      <Route key={'route-to-home-2'} path={'/home'} exact={true} component={Home} />
      <Route key={'route-to-about'} path={'/about'} exact={true} component={About} />
      <Route key={'route-to-contact'} path={'/contact'} exact={true} component={Contact} />

      {/* Tools */}
      <Route key={'route-to-dashboard-tool'} path={'/dashboard'} exact={true} component={Dashboard} />
      <Route key={'route-to-selector-tool'} path={'/selector'} exact={true} component={SelectorTool} />
      <Route key={'route-to-atlas-tool'} path={'/atlas'} exact={true} component={Atlas} />

      {/* Explorer */}
      <Route key={'route-to-explorer-variables'} path={'/variables'} exact={true} component={Variables} />
      <Route key={'route-to-explorer-protocols'} path={'/protocols'} exact={true} component={Protocols} />
      <Route key={'route-to-explorer-data-products'} path={'/data-products'} exact={true} component={DataProducts} />
    </Navigation>
  </BrowserRouter>
)

export default App
