import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import GlobalState from './global-state'
import Navigation from './modules/layout'
import Home from './pages/home'
import Contact from './pages/contact'
import SitesExplorer from './pages/explorer-sites'
import ProtocolsExplorer from './pages/explorer-protocols'
import VariablesExplorer from './pages/explorer-variables'
import DataproductsExplorer from './pages/explorer-dataproducts'
import NetworksExplorer from './pages/explorer-networks'
import NetworkEditor from './pages/editor-networks'
import VariableEditor from './pages/editor-variables'
import ProtocolEditor from './pages/editor-protocols'
import DataproductEditor from './pages/editor-dataproducts'
import navItems from './nav-items'
import Form from './modules/form'

// SPA wrapper
const App = () => (
  <GlobalState>
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
        hoveredVariable,
        hoveredProtocol,
        hoveredDP
      }) => (
        <BrowserRouter>
          <Navigation navItems={navItems}>
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
                  updateForm={updateForm}
                  selectedNetwork={selectedNetwork}
                  selectedVariable={selectedVariable}
                  selectedProtocol={selectedProtocol}
                  {...props}
                />
              )}
            />

            {/* Network Explorer */}
            <Route key={'networks-explorer'} path={'/networks'} exact={true} render={props => <NetworksExplorer />} />

            {/* Variables Explorer */}
            <Route
              key={'explorer-variables'}
              path={'/variables'}
              exact={true}
              render={props => <VariablesExplorer />}
            />
            {/* Protocols Explorer */}
            <Route
              key={'explorer-protocols'}
              path={'/protocols'}
              exact={true}
              render={props => <ProtocolsExplorer />}
            />
            {/* Dataproducts Explorer */}
            <Route
              key={'explorer-dataproducts'}
              path={'/dataproducts'}
              exact={true}
              render={props => <DataproductsExplorer />}
            />

            {/* Edit data */}
            <Route
              key={'edit-networks'}
              path={'/networks/:id'}
              exact={false}
              render={props => <NetworkEditor id={props.match.params.id} {...props} />}
            />
            <Route
              key={'edit-variables'}
              path={'/variables/:id'}
              exact={false}
              render={props => <VariableEditor id={props.match.params.id} {...props} />}
            />
            <Route
              key={'edit-protocols'}
              path={'/protocols/:id'}
              exact={false}
              render={props => <ProtocolEditor id={props.match.params.id} {...props} />}
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
  </GlobalState>
)

export default App
