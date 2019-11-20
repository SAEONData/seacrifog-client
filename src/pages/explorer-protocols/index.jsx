import React from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStateContext } from '../../global-state'
import DataQuery from '../../modules/data-query'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import {
  NoneMessage,
  FormattedInfo,
  ExplorerHeader,
  ExplorerLayout,
  ExplorerTableLayout,
  ExplorerTabsLayout,
  ExplorerEntityLayout,
  ExplorerAttributeLayout
} from '../../modules/shared-components'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import { FontIcon, Button, Avatar, List, ListItem } from 'react-md'
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

const mappings = {}

export default props => {
  const history = useHistory()
  return (
    <GlobalStateContext.Consumer>
      {({ selectedProtocols, updateSelectedProtocols, selectedVariables, updateSelectedVariables }) => (
        <DataQuery query={PROTOCOLS_MIN}>
          {({ protocols }) => (
            <ExplorerLayout>
              <ExplorerHeader />
              <ExplorerTableLayout>
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
                  selectedIds={selectedProtocols}
                  toggleSelect={({ id, selected }) =>
                    updateSelectedProtocols(
                      selected ? [...new Set([...selectedProtocols, id])] : [...selectedProtocols].filter(i => i !== id)
                    )
                  }
                  dataDefinitions={protocolsDataDefinitions}
                  data={protocols}
                />
              </ExplorerTableLayout>
              <ExplorerTabsLayout id="selected-protocols-tabs" selectedIds={selectedProtocols}>
                {({ id }) => (
                  <DataQuery query={PROTOCOL} variables={{ id: id }}>
                    {({ protocol }) => (
                      <ExplorerEntityLayout
                        title={protocol.title}
                        authors={protocol.author}
                        abstract={protocol.abstract}
                        clickClose={() => updateSelectedProtocols(selectedProtocols.filter(sId => sId !== protocol.id))}
                        clickDownload={() => alert('todo')}
                        clickEdit={() => history.push(`/protocols/${protocol.id}`)}
                      >
                        {/* All Entity Attributes */}
                        <ExplorerAttributeLayout
                          sections={[
                            {
                              title: 'Protocol Attributes',
                              subTitle: 'List of Fields',
                              component: (
                                <FormattedInfo
                                  object={formatAndFilterObjectKeys(protocol, mappings, ([key, val]) =>
                                    ['abstract', '__typename'].includes(key) || typeof val === 'object' ? false : true
                                  )}
                                />
                              )
                            },
                            {
                              title: 'Related Variables',
                              subTitle: 'Directly / Indirectly',
                              component:
                                protocol.directly_related_variables[0] || protocol.indirectly_related_variables[0] ? (
                                  <div>
                                    <List>
                                      {protocol.directly_related_variables
                                        .map(v => mergeLeft({ relationship: 'direct' }, v))
                                        .concat(
                                          protocol.indirectly_related_variables.map(v =>
                                            mergeLeft({ relationship: 'indirect' }, v)
                                          )
                                        )
                                        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
                                        .map((variable, i) => (
                                          <ListItem
                                            onClick={() =>
                                              updateSelectedVariables([...new Set([selectedVariables, id])], () =>
                                                history.push('/variables')
                                              )
                                            }
                                            className="add-on-hover"
                                            key={i}
                                            rightIcon={variableIcon}
                                            leftIcon={VariableIconLink}
                                            primaryText={`${variable.relationship.toUpperCase()} - ${variable.name}`}
                                          />
                                        ))}
                                    </List>
                                  </div>
                                ) : (
                                  <NoneMessage />
                                )
                            }
                          ]}
                        />
                      </ExplorerEntityLayout>
                    )}
                  </DataQuery>
                )}
              </ExplorerTabsLayout>
            </ExplorerLayout>
          )}
        </DataQuery>
      )}
    </GlobalStateContext.Consumer>
  )
}
