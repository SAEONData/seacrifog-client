import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './modules/layout'
import Home from './pages/home'
import Contact from './pages/contact'
import Dashboard from './pages/dashboard'
import SelectorTool from './pages/selector-tool'
import Atlas from './pages/atlas'
import ProtocolsExplorer from './pages/explorer-protocols'
import VariablesExplorer from './pages/explorer-variables'
import DataproductsExplorer from './pages/explorer-dataproducts'
import VariableEditor from './pages/editor-variables'
import ProtocolEditor from './pages/editor-protocols'
import DataproductEditor from './pages/editor-dataproducts'
import navItems from './nav-items'
import Test from './pages/test'
import Form from './modules/form'
import DataQuery from './modules/data-query'
import { ENTIRE_GRAPH } from './graphql/queries'

// TODO: Each page navigation should scroll to top of page
// https://stackoverflow.com/a/44438949/3114742

// SPA wrapper
const App = () => (
  <Form
    hoveredProtocol={null}
    selectedProtocol={null}
    hoveredDP={null}
    selectedDP={null}
    hoveredVariable={null}
    selectedVariable={null}
  >
    {({ updateForm, hoveredProtocol, selectedProtocol, hoveredDP, selectedDP, hoveredVariable, selectedVariable }) => (
      <BrowserRouter>
        <Navigation navItems={navItems}>
          {/* Basic navigation */}
          <Route key={'home'} path={'/'} exact={true} component={Home} />
          <Route key={'home-2'} path={'/home'} exact={true} component={Home} />
          <Route key={'contact'} path={'/contact'} exact={true} component={Contact} />

          <Route key={'test'} path={'/test'} exact={false} component={Test} />

          {/* Explorer data */}
          <Route
            key={'explorer-variables'}
            path={'/variables'}
            exact={true}
            render={props => (
              <VariablesExplorer
                updateForm={updateForm}
                hoveredVariable={hoveredVariable}
                selectedVariable={selectedVariable}
                {...props}
              />
            )}
          />
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
            key={'explorer-dataproducts'}
            path={'/dataproducts'}
            exact={true}
            render={props => (
              <DataproductsExplorer updateForm={updateForm} hoveredDP={hoveredDP} selectedDP={selectedDP} {...props} />
            )}
          />

          {/* Edit data */}
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

          {/* Tools */}
          <Route key={'dashboard-tool'} path={'/dashboard'} exact={true} component={Dashboard} />
          <Route
            key={'selector-tool'}
            path={'/selector'}
            exact={true}
            render={props => (
              <SelectorTool
                updateForm={updateForm}
                selectedProtocol={selectedProtocol}
                selectedVariable={selectedVariable}
                {...props}
              />
            )}
          />
          <Route
            key={'atlas-tool'}
            path={'/atlas'}
            exact={true}
            render={props => (
              <DataQuery query={ENTIRE_GRAPH} variables={{}}>
                {data => <Atlas data={data} />}
              </DataQuery>
            )}
          />
        </Navigation>
      </BrowserRouter>
    )}
  </Form>
)

export default App
