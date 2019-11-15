import React from 'react'
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
  ExpansionList,
  ExpansionPanel,
  Toolbar,
  Button,
  Avatar
} from 'react-md'
import { mergeLeft } from 'ramda'
import { Table } from '../../modules/shared-components'

const protocolsDataDefinitions = {
  id: { order: 0, show: true, label: 'ID' },
  title: { order: 1, show: true, label: 'Protocol' },
  author: { order: 2, show: true, grow: true, label: 'Author' },
  domain: { order: 3, show: true, label: 'Domain' },
  __typename: { show: false }
}

const variablesDataDefinitions = {
  id: { order: 0, show: true, label: 'ID' },
  name: { order: 1, show: true, label: 'Name' },
  relationship: { order: 1, show: true, label: 'Relationship' }
}

const mappings = {}

export default props => (
  <GlobalStateContext.Consumer>
    {({ selectedProtocols, updateSelectedProtocols, selectedVariables, updateSelectedVariables }) => (
      <DataQuery query={PROTOCOLS_MIN}>
        {({ protocols }) => (
          <TabsContainer
            toolbar={
              <Toolbar
                title={'Notifications, link controls, etc'}
                actions={[
                  <Button style={{ marginLeft: '10px' }} raised iconChildren="save_alt">
                    Download all data
                  </Button>,
                  <Button style={{ marginLeft: '10px' }} raised iconChildren="refresh">
                    Reset
                  </Button>
                ]}
              />
            }
          >
            <Tabs style={{ backgroundColor: '#005fb3' }} tabId="main-tabs">
              <Tab icon={<FontIcon>search</FontIcon>}>
                <Grid noSpacing>
                  <Cell tabletSize={8} size={6}>
                    <Card tableCard>
                      <Table
                        baseId={'protocols-table'}
                        searchbar={true}
                        defaultPaginationRows={20}
                        selectedIds={selectedProtocols}
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
                  </Cell>
                  <Cell tabletSize={8} size={6}>
                    <TabsContainer colored>
                      <Tabs style={{ overflowX: 'auto' }} component={'div'} tabId="sub-tabs">
                        {selectedProtocols.length > 0 ? (
                          selectedProtocols.map((id, i) => (
                            <Tab
                              key={i}
                              icon={
                                <Avatar
                                  key={'blue'}
                                  suffix={'blue'}
                                  children={id}
                                  contentStyle={{ fontSize: '10px' }}
                                  iconSized
                                />
                              }
                            >
                              <Grid>
                                <Cell size={12}>
                                  <DataQuery query={PROTOCOL} variables={{ id: id }}>
                                    {({ protocol }) => (
                                      <>
                                        <Button style={{ marginLeft: '10px', float: 'right' }} icon>
                                          close
                                        </Button>
                                        <Button style={{ marginLeft: '10px', float: 'right' }} icon>
                                          link
                                        </Button>
                                        <Button style={{ marginLeft: '10px', float: 'right' }} icon>
                                          save_alt
                                        </Button>
                                        <Button style={{ marginLeft: '10px', float: 'right' }} icon>
                                          edit
                                        </Button>
                                        <div style={{ clear: 'both' }} />
                                        {
                                          <FormattedInfo
                                            object={formatAndFilterObjectKeys(protocol, mappings, ([key, val]) =>
                                              ['title', 'author', 'domain', 'abstract'].includes(key)
                                            )}
                                          />
                                        }
                                        <ExpansionList>
                                          <ExpansionPanel label="Additional Information" footer={false}>
                                            {
                                              <FormattedInfo
                                                object={formatAndFilterObjectKeys(protocol, mappings, ([key, val]) =>
                                                  ['abstract', '__typename'].includes(key) || typeof val === 'object'
                                                    ? false
                                                    : true
                                                )}
                                              />
                                            }
                                          </ExpansionPanel>
                                        </ExpansionList>
                                        <h3 style={{ marginTop: '100px' }}>Related Variables</h3>
                                        {protocol.directly_related_variables[0] ||
                                        protocol.indirectly_related_variables[0] ? (
                                          <Table
                                            baseId={`protocols-variables-table-${protocol.id}`}
                                            searchbar={false}
                                            defaultPaginationRows={2}
                                            selectedIds={selectedVariables}
                                            toggleSelect={({ id, selected }) =>
                                              updateSelectedVariables(
                                                selected
                                                  ? [...new Set([...selectedVariables, id])]
                                                  : [...selectedVariables].filter(i => i !== id)
                                              )
                                            }
                                            dataDefinitions={variablesDataDefinitions}
                                            data={protocol.directly_related_variables
                                              .map(v => mergeLeft({ relationship: 'direct' }, v))
                                              .concat(
                                                protocol.indirectly_related_variables.map(v =>
                                                  mergeLeft({ relationship: 'indirect' }, v)
                                                )
                                              )}
                                          />
                                        ) : (
                                          <NoneMessage />
                                        )}
                                      </>
                                    )}
                                  </DataQuery>
                                </Cell>
                              </Grid>
                            </Tab>
                          ))
                        ) : (
                          <Tab label="...">
                            <Grid>
                              <Cell size={12}>
                                <i>Select rows in the table</i>
                              </Cell>
                            </Grid>
                          </Tab>
                        )}
                      </Tabs>
                    </TabsContainer>
                  </Cell>
                </Grid>
              </Tab>
              <Tab icon={<FontIcon>bar_chart</FontIcon>}>
                <h3>ECharts goes here</h3>
              </Tab>
              <Tab icon={<FontIcon>grid_on</FontIcon>}>
                <h3>A sheet-data explorer?</h3>
              </Tab>
            </Tabs>
          </TabsContainer>
        )}
      </DataQuery>
    )}
  </GlobalStateContext.Consumer>
)
