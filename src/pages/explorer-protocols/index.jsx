import React from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStateContext } from '../../global-state'
import DataQuery from '../../modules/data-query'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import { NoneMessage, FormattedInfo } from '../../modules/shared-components'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import {
  Grid,
  Cell,
  Card,
  FontIcon,
  TabsContainer,
  Tabs,
  Tab,
  Toolbar,
  Button,
  Avatar,
  CardText,
  CardTitle,
  List,
  ListItem
} from 'react-md'
import { mergeLeft } from 'ramda'
import { Table } from '../../modules/shared-components'

const variableIcon = <Avatar contentStyle={{ fontSize: '11px' }} iconSized suffix={'light-blue'} children="V" />

const VariableIconLink = <FontIcon>link</FontIcon>

const protocolsDataDefinitions = {
  id: { order: 0, show: true, label: 'ID' },
  title: { order: 1, show: true, label: 'Protocol' },
  author: { order: 2, show: true, grow: false, label: 'Author' },
  domain: { order: 3, show: true, label: 'Domain' },
  publisher: { order: 4, show: true, label: 'Publisher' },
  format: { order: 9, show: true, label: 'Format' },
  __typename: { show: false }
}

const mainMenuIconStyle = {
  marginLeft: '10px',
  color: 'white'
}

const itemMenuIconStyle = {
  float: 'right',
  marginLeft: '10px'
}

const mappings = {}

export default props => {
  const history = useHistory()
  return (
    <GlobalStateContext.Consumer>
      {({ selectedProtocols, updateSelectedProtocols, selectedVariables, updateSelectedVariables }) => (
        <DataQuery query={PROTOCOLS_MIN}>
          {({ protocols }) => (
            <Grid noSpacing>
              <Cell size={12}>
                <Toolbar
                  title={'Notifications, link controls, etc'}
                  style={{ backgroundColor: '#005fb3' }}
                  actions={[
                    <Button style={mainMenuIconStyle} icon>
                      filter_list
                    </Button>,
                    <Button style={mainMenuIconStyle} icon>
                      save_alt
                    </Button>,
                    <Button onClick={() => updateSelectedProtocols([])} style={mainMenuIconStyle} icon>
                      refresh
                    </Button>
                  ]}
                />
                <Grid noSpacing>
                  <Cell size={12}>
                    <Card style={{ boxShadow: 'none' }} tableCard>
                      <Table
                        actions={[
                          <Button
                            key={'reset-form-button'}
                            primary
                            disabled={selectedProtocols.length > 0 ? false : true}
                            tooltipPosition={'left'}
                            style={{ display: 'flex', marginRight: '20px' }}
                            icon
                            onClick={() => alert('This will make the page scroll down')}
                          >
                            arrow_downward
                          </Button>
                        ]}
                        baseId={'protocols-table'}
                        searchbar={true}
                        className={'fixed-table'}
                        defaultPaginationRows={5}
                        selectedIds={[selectedProtocols]}
                        toggleSelect={({ id, selected }) =>
                          updateSelectedProtocols(
                            selected
                              ? [...new Set([...selectedProtocols, id])]
                              : [...selectedProtocols].filter(i => i !== id)
                          )
                        }
                        dataDefinitions={protocolsDataDefinitions}
                        data={protocols}
                      />
                    </Card>
                    {selectedProtocols.length > 0 ? (
                      <TabsContainer colored>
                        <Tabs id="test" tabId="selected-protocols-tab">
                          {selectedProtocols
                            .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
                            .map((id, i) => (
                              <Tab
                                key={i}
                                icon={
                                  <Avatar
                                    key={i}
                                    children={id}
                                    contentStyle={{
                                      backgroundColor: 'white',
                                      color: 'black',
                                      border: 'none',
                                      fontSize: '10px'
                                    }}
                                    iconSized
                                  />
                                }
                              >
                                <Grid>
                                  <Cell size={12}>
                                    <DataQuery query={PROTOCOL} variables={{ id: id }}>
                                      {({ protocol }) => (
                                        <>
                                          <Grid>
                                            <Cell size={12}>
                                              <Button
                                                onClick={() =>
                                                  updateSelectedProtocols(
                                                    selectedProtocols.filter(sId => sId !== protocol.id)
                                                  )
                                                }
                                                style={itemMenuIconStyle}
                                                icon
                                              >
                                                close
                                              </Button>
                                              <Button style={itemMenuIconStyle} icon>
                                                save_alt
                                              </Button>
                                              <Button
                                                onClick={() => history.push(`/protocols/${protocol.id}`)}
                                                style={itemMenuIconStyle}
                                                icon
                                              >
                                                edit
                                              </Button>

                                              {/* Content divider */}
                                              <div style={{ clear: 'both' }} />
                                              <div style={{ margin: '20px' }} />

                                              {/* Overview */}
                                              <div style={{ textAlign: 'center' }}>
                                                <h1>{protocol.title}</h1>
                                                <h4>{protocol.author}</h4>
                                                <p style={{ fontStyle: 'bold', margin: '20px 0 15px' }}>ABSTRACT</p>
                                                <p>{protocol.abstract}</p>
                                              </div>
                                            </Cell>
                                          </Grid>
                                          <Grid>
                                            <Cell phoneSize={4} tabletSize={8} size={6}>
                                              <Card style={{ boxShadow: 'none' }}>
                                                <CardTitle
                                                  title="Protocol fields"
                                                  subtitle={'General protocol protperties'}
                                                />
                                                <CardText>
                                                  <FormattedInfo
                                                    object={formatAndFilterObjectKeys(
                                                      protocol,
                                                      mappings,
                                                      ([key, val]) =>
                                                        ['abstract', '__typename'].includes(key) ||
                                                        typeof val === 'object'
                                                          ? false
                                                          : true
                                                    )}
                                                  />
                                                </CardText>
                                              </Card>
                                            </Cell>

                                            {/* Related variables */}
                                            <Cell phoneSize={4} tabletSize={8} size={6}>
                                              <Card style={{ boxShadow: 'none' }}>
                                                <CardTitle
                                                  title="Related variables"
                                                  subtitle={'Directly or Indirectly'}
                                                />
                                                <CardText>
                                                  {protocol.directly_related_variables[0] ||
                                                  protocol.indirectly_related_variables[0] ? (
                                                    <div style={{ maxHeight: '620px', overflow: 'auto' }}>
                                                      <List>
                                                        {protocol.directly_related_variables
                                                          .map(v => mergeLeft({ relationship: 'direct' }, v))
                                                          .concat(
                                                            protocol.indirectly_related_variables.map(v =>
                                                              mergeLeft({ relationship: 'indirect' }, v)
                                                            )
                                                          )
                                                          .sort((a, b) =>
                                                            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                                                          )
                                                          .map((variable, i) => (
                                                            <ListItem
                                                              onClick={() =>
                                                                updateSelectedVariables(
                                                                  [...new Set([selectedVariables, id])],
                                                                  () => history.push('/variables')
                                                                )
                                                              }
                                                              className="add-on-hover"
                                                              key={i}
                                                              rightIcon={variableIcon}
                                                              leftIcon={VariableIconLink}
                                                              primaryText={`${variable.relationship.toUpperCase()} - ${
                                                                variable.name
                                                              }`}
                                                            />
                                                          ))}
                                                      </List>
                                                    </div>
                                                  ) : (
                                                    <NoneMessage />
                                                  )}
                                                </CardText>
                                              </Card>
                                            </Cell>
                                          </Grid>
                                        </>
                                      )}
                                    </DataQuery>
                                  </Cell>
                                </Grid>
                              </Tab>
                            ))}
                        </Tabs>
                      </TabsContainer>
                    ) : (
                      <Grid>
                        <Cell size={12}>
                          <p>Select multiple protocols in the table above</p>
                        </Cell>
                      </Grid>
                    )}
                  </Cell>
                </Grid>
              </Cell>
            </Grid>
          )}
        </DataQuery>
      )}
    </GlobalStateContext.Consumer>
  )
}
