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
  Button
} from 'react-md'
import { Table } from '../../modules/shared-components'

const dataDefinitions = {
  id: { order: 0, show: true, label: 'ID' },
  title: { order: 1, show: true, label: 'Protocol' },
  author: { order: 2, show: true, grow: true, label: 'Author' },
  domain: { order: 3, show: true, label: 'Domain' },
  __typename: { show: false }
}

const mappings = {}

export default props => (
  <GlobalStateContext.Consumer>
    {({ selectedProtocols, updateSelectedProtocols }) => (
      <DataQuery query={PROTOCOLS_MIN}>
        {({ protocols }) => (
          <TabsContainer
            toolbar={
              <Toolbar
                title={'Atlas selection notifications go here'}
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
                        selectedIds={selectedProtocols}
                        toggleSelect={({ id, selected }) => {
                          const arr = selected
                            ? [...new Set([...selectedProtocols, id])]
                            : selectedProtocols.filter(i => i !== id)
                          updateSelectedProtocols(arr)
                        }}
                        dataDefinitions={dataDefinitions}
                        data={protocols}
                      />
                    </Card>
                  </Cell>
                  <Cell tabletSize={8} size={6}>
                    <TabsContainer
                      toolbar={
                        <Toolbar
                          actions={[
                            <Button style={{ marginLeft: '10px' }} icon>
                              save_alt
                            </Button>,
                            <Button style={{ marginLeft: '10px' }} icon>
                              link
                            </Button>,
                            <Button style={{ marginLeft: '10px' }} icon>
                              close
                            </Button>
                          ]}
                        />
                      }
                      colored
                    >
                      <Tabs style={{ overflowX: 'auto' }} component={'div'} tabId="sub-tabs">
                        {selectedProtocols.length > 0 ? (
                          selectedProtocols.map((id, i) => (
                            <Tab key={i} label={`ID ${id}`}>
                              <Grid>
                                <Cell size={12}>
                                  <DataQuery query={PROTOCOL} variables={{ id: id }}>
                                    {({ protocol }) => (
                                      <>
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
                                          <ExpansionPanel label={'Related Variables'} footer={null}>
                                            {protocol.directly_related_variables[0] ? 'TODO' : <NoneMessage />}
                                          </ExpansionPanel>
                                        </ExpansionList>
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
