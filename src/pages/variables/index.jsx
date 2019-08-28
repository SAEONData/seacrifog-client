import React from 'react'
import Form from '../../modules/form'
import QueryRenderer from '../../modules/query-renderer'
import { VARIABLES } from '../../graphql/queries'
import VariablesList from './variables-detail'
import ProtocolsList from './protocols-detail'
import {
  Card,
  CardText,
  Grid,
  Cell,
  DropdownMenu,
  ListItem,
  TextField,
  ListItemControl,
  SelectionControl,
  ExpansionList,
  ExpansionPanel,
  FontIcon
} from 'react-md'

// eslint-disable-next-line no-extend-native
String.prototype.truncate = function(length, ending) {
  length = length || 100
  ending = ending || '...'
  if (this.length > length) return this.substring(0, length - ending.length) + ending
  else return this
}

export default () => (
  <QueryRenderer query={VARIABLES}>
    {({ variables }) => (
      <Form searchTerm="" selectedVariables={[]} selectedProtocols={[]}>
        {({ updateForm, searchTerm, selectedVariables, selectedProtocols }) => (
          <Grid>
            <Cell phoneSize={6} tabletSize={4} size={9}>
              <Grid>
                <Cell phoneSize={6} tabletSize={8} size={12}>
                  <Card>
                    <span
                      style={{
                        float: 'right',
                        margin: '10px 10px 0 0'
                      }}
                    >
                      {selectedVariables.length} variables selected
                    </span>
                    <CardText>
                      <DropdownMenu
                        id="variables-search-menu"
                        style={{ width: '100%' }}
                        menuItems={(() => {
                          const variablesList = variables
                            .map(v => {
                              const search = searchTerm.trim().toUpperCase()
                              const nameFound = search === '' ? true : v.name.toUpperCase().indexOf(search) >= 0 ? true : false
                              const classFound = search === '' ? true : v.class.toUpperCase().indexOf(search) >= 0 ? true : false
                              const domainFound = search === '' ? true : v.domain.toUpperCase().indexOf(search) >= 0 ? true : false
                              if (nameFound || classFound || domainFound) {
                                return (
                                  <ListItemControl
                                    key={`variable-${v.id}`}
                                    style={{ width: '100%' }}
                                    secondaryText={
                                      <>
                                        {v.domain}
                                        <br />
                                        {v.class}
                                      </>
                                    }
                                    threeLines
                                    primaryAction={
                                      <SelectionControl
                                        id={`variable-toggle-${v.id}`}
                                        label={v.name.truncate(40)}
                                        name={v.name.truncate(40)}
                                        type="checkbox"
                                        labelBefore
                                        checked={selectedVariables.includes(v.id) ? true : false}
                                        onChange={val => {
                                          if (val)
                                            updateForm({
                                              selectedVariables: [...selectedVariables, v.id]
                                            })
                                          else
                                            updateForm({
                                              selectedVariables: [...selectedVariables].filter(id => id !== v.id)
                                            })
                                        }}
                                      />
                                    }
                                  />
                                )
                              } else {
                                return null
                              }
                            })
                            .filter(_ => _)
                          return variablesList.length > 0 ? variablesList : <ListItem primaryText="No variables found" />
                        })()}
                        anchor={{
                          x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
                          y: DropdownMenu.VerticalAnchors.BOTTOM
                        }}
                        position={DropdownMenu.Positions.BELOW}
                      >
                        <TextField
                          id="variables-search-text"
                          label="Search"
                          autoComplete="off"
                          value={searchTerm}
                          placeholder="Search variables by name, class, or domain"
                          onChange={val => updateForm({ searchTerm: val })}
                        />
                      </DropdownMenu>
                    </CardText>
                  </Card>
                </Cell>

                {/* Variables Detail */}
                <Cell size={12} tabletSize={8} phoneSize={6}>
                  {selectedVariables.length > 0 ? (
                    <>
                      <Cell phoneSize={6} tabletSize={8} size={12} style={{ textAlign: 'center' }}>
                        <FontIcon>arrow_downward</FontIcon>
                      </Cell>
                      <h3 style={{ margin: '15px', textAlign: 'center' }}>Selected variables</h3>
                      <VariablesList
                        selectedProtocols={selectedProtocols}
                        updateMainForm={updateForm}
                        variables={selectedVariables.map(id => variables.find(v => v.id === id))}
                      />
                    </>
                  ) : (
                    ''
                  )}
                </Cell>

                {/* Protocols Detail */}
                <Cell size={12} tabletSize={8} phoneSize={6}>
                  {selectedProtocols.length > 0 ? (
                    <>
                      <Cell phoneSize={6} tabletSize={8} size={12} style={{ textAlign: 'center' }}>
                        <FontIcon>arrow_downward</FontIcon>
                      </Cell>
                      <h3 style={{ margin: '15px', textAlign: 'center' }}>Selected protocols</h3>
                      <ProtocolsList protocols={selectedProtocols} />
                    </>
                  ) : (
                    ''
                  )}
                </Cell>
              </Grid>
            </Cell>

            {/* Search results */}
            <Cell phoneSize={6} tabletSize={4} size={3}>
              <Grid>
                <Cell size={12}>
                  <ExpansionList>
                    <ExpansionPanel key={`search-result-${0}`} label="Search result 1" footer={false}>
                      <p>After searching variables, protocols, networks, etc. These panels are the search results</p>
                      <p>Each panel can contain links, buttons, etc.</p>
                    </ExpansionPanel>
                    <ExpansionPanel key={`search-result-${1}`} label="Search result 2" footer={false}>
                      <p>...</p>
                    </ExpansionPanel>
                    <ExpansionPanel key={`search-result-${2}`} label="Search result 2" footer={false}>
                      <p>...</p>
                      <p>etc</p>
                    </ExpansionPanel>
                  </ExpansionList>
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        )}
      </Form>
    )}
  </QueryRenderer>
)
