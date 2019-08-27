import React from 'react'
import Form from '../../modules/form'
import QueryRenderer from '../../modules/query-renderer'
import { VARIABLES } from '../../graphql/queries'
import VariablesTable from './variables-table'
import { Card, CardText, Grid, Cell, DropdownMenu, ListItem, TextField, ListItemControl, Checkbox, FontIcon } from 'react-md'

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
      <Form searchTerm="" selectedVariables={[]} selectedVariableRow={null}>
        {({ updateForm, searchTerm, selectedVariables, selectedVariableRow }) => (
          <Grid>
            <Cell size={12} tabletSize={8} phoneSize={6}>
              <Card>
                <CardText>
                  <DropdownMenu
                    id="variables-search-menu"
                    style={{ width: '100%' }}
                    menuItems={(() => {
                      const variablesList = variables
                        .map(v => {
                          const search = searchTerm.toUpperCase()
                          const nameFound = v.name.toUpperCase().indexOf(search) >= 0 ? true : false
                          const classFound = v.class.toUpperCase().indexOf(search) >= 0 ? true : false
                          const domainFound = v.domain.toUpperCase().indexOf(search) >= 0 ? true : false
                          const descriptionFound = v.description.toUpperCase().indexOf(search) >= 0 ? true : false
                          if (nameFound || classFound || domainFound || descriptionFound) {
                            return (
                              <ListItemControl
                                key={`variable-${v.id}`}
                                style={{ width: '100%' }}
                                leftIcon={
                                  <FontIcon style={{ marginLeft: '10px' }} key="user">
                                    code
                                  </FontIcon>
                                }
                                secondaryText={`${v.description.truncate(150)}`}
                                primaryAction={
                                  <Checkbox
                                    id={`variable-toggle-${v.id}`}
                                    label={v.name}
                                    name={v.name}
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
                      placeholder="Search variables by name, class, domain, or description"
                      onChange={val => updateForm({ searchTerm: val })}
                    />
                  </DropdownMenu>
                </CardText>
              </Card>
            </Cell>

            <Cell size={12} tabletSize={8} phoneSize={6}>
              <Card style={{ height: '100' }}>
                <Grid>
                  <Cell size={6} tabletSize={8} phoneSize={6}>
                    <CardText>
                      <VariablesTable
                        selectedVariableRow={selectedVariableRow}
                        updateForm={updateForm}
                        data={selectedVariables.map(id => variables.find(v => v.id === id))}
                      />
                    </CardText>
                  </Cell>
                </Grid>
              </Card>
            </Cell>
          </Grid>
        )}
      </Form>
    )}
  </QueryRenderer>
)
