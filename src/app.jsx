import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './modules/layout'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Dashboard from './pages/dashboard'
import SelectorTool from './pages/selector-tool'
import Atlas from './pages/atlas'
import ProtocolsExplorer from './pages/explorer-protocols'
import VariablesExplorer from './pages/explorer-variables'
import DataproductsExplorer from './pages/explorer-dataproducts'
import navItems from './nav-items'
import Test from './pages/test'

// SPA wrapper
const App = () => (
  <BrowserRouter>
    <Navigation navItems={navItems}>
      {/* Basic navigation */}
      <Route key={'route-to-home'} path={'/'} exact={true} component={Home} />
      <Route key={'route-to-home-2'} path={'/home'} exact={true} component={Home} />
      <Route key={'route-to-about'} path={'/about'} exact={true} component={About} />
      <Route key={'route-to-contact'} path={'/contact'} exact={true} component={Contact} />

      <Route key={'test'} path={'/test'} exact={false} component={Test} />

      {/* Tools */}
      <Route key={'route-to-dashboard-tool'} path={'/dashboard'} exact={true} component={Dashboard} />
      <Route key={'route-to-selector-tool'} path={'/selector'} exact={true} component={SelectorTool} />
      <Route key={'route-to-atlas-tool'} path={'/atlas'} exact={true} component={Atlas} />

      {/* Explorer tool */}
      <Route key={'route-to-explorer-variables'} path={'/explore/variables'} exact={false} render={props => <VariablesExplorer {...props} />} />
      <Route key={'route-to-explorer-protocols'} path={'/explore/protocols'} exact={false} render={props => <ProtocolsExplorer {...props} />} />
      <Route
        key={'route-to-explorer-dataproducts'}
        path={'/explore/dataproducts'}
        exact={false}
        render={props => <DataproductsExplorer {...props} />}
      />
    </Navigation>
  </BrowserRouter>
)

export default App
