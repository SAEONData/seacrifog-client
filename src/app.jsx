import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './modules/layout'
import Home from './pages/home'
import Contact from './pages/contact'
import SitesExplorer from './pages/explorer-sites'
import ProtocolsExplorer from './pages/explorer-protocols'
import VariablesExplorer from './pages/explorer-variables'
import DataproductsExplorer from './pages/explorer-dataproducts'
import NetworksExplorer from './pages/explorer-networks'
import VariableEditor from './pages/editor-variables'
import ProtocolEditor from './pages/editor-protocols'
import DataproductEditor from './pages/editor-dataproducts'
import navItems from './nav-items'
import Test from './pages/test'
import Form from './modules/form'

// TODO: Each page navigation should scroll to top of page
// https://stackoverflow.com/a/44438949/3114742

// SPA wrapper
const App = () => (
  <Form
    selectedNetwork={null}
    selectedVariable={null}
    selectedProtocol={null}
    selectedDP={null}
    hoveredNetwork={null}
    hoveredVariable={null}
    hoveredProtocol={null}
    hoveredDP={null}
  >
    {({
      updateForm,
      selectedNetwork,
      selectedVariable,
      selectedProtocol,
      selectedDP,
      hoveredNetwork,
      hoveredVariable,
      hoveredProtocol,
      hoveredDP
    }) => (
      <BrowserRouter>
        <Navigation navItems={navItems}>
          {/* This is a route for testing things */}
          <Route key={'test'} path={'/test'} exact={false} component={Test} />

          {/* Basic navigation */}
          <Route key={'home'} path={'/'} exact={true} component={Home} />
          <Route key={'home-2'} path={'/home'} exact={true} component={Home} />
          <Route key={'contact'} path={'/contact'} exact={true} component={Contact} />

          {/* Sites */}
          <Route
            key={'sites-explorer'}
            path={'/sites'}
            exact={true}
            render={props => (
              <SitesExplorer
                selectedNetwork={selectedNetwork}
                selectedVariable={selectedVariable}
                selectedProtocol={selectedProtocol}
                {...props}
              />
            )}
          />

          {/* Variables */}
          <Route
            key={'explorer-variables'}
            path={'/variables'}
            exact={true}
            render={props => (
              <VariablesExplorer
                updateForm={updateForm}
                selectedVariable={selectedVariable}
                hoveredVariable={hoveredVariable}
                {...props}
              />
            )}
          />
          <Route
            key={'edit-variables'}
            path={'/variables/:id'}
            exact={false}
            render={props => <VariableEditor id={props.match.params.id} {...props} />}
          />

          {/* Protocols */}
          <Route
            key={'explorer-protocols'}
            path={'/protocols'}
            exact={true}
            render={props => (
              <ProtocolsExplorer
                updateForm={updateForm}
                hoveredProtocol={hoveredProtocol}
                selectedProtocol={selectedProtocol}
                {...props}
              />
            )}
          />
          <Route
            key={'edit-protocols'}
            path={'/protocols/:id'}
            exact={false}
            render={props => <ProtocolEditor id={props.match.params.id} {...props} />}
          />

          {/* Networks */}
          <Route
            key={'explorer-networks'}
            path={'/networks'}
            exact={true}
            render={props => <NetworksExplorer updateForm={updateForm} {...props} />}
          />

          {/* Dataproducts */}
          <Route
            key={'explorer-dataproducts'}
            path={'/dataproducts'}
            exact={true}
            render={props => (
              <DataproductsExplorer updateForm={updateForm} hoveredDP={hoveredDP} selectedDP={selectedDP} {...props} />
            )}
          />
          <Route
            key={'edit-dataproducts'}
            path={'/dataproducts/:id'}
            exact={false}
            render={props => <DataproductEditor id={props.match.params.id} {...props} />}
          />
        </Navigation>
      </BrowserRouter>
    )}
  </Form>
)

export default App
