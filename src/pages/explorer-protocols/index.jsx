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
  ExplorerSectionLayout,
  ScrollButton,
  variableIcon,
  iconLink
} from '../../modules/shared-components'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import { List, ListItem } from 'react-md'
import { mergeLeft } from 'ramda'
import { Table } from '../../modules/shared-components'

const protocolsDataDefinitions = {
  id: { order: 0, show: true, label: 'ID' },
  title: { order: 1, show: true, label: 'Protocol' },
  author: { order: 2, show: true, label: 'Author' },
  domain: { order: 3, show: true, label: 'Domain' },
  publisher: { order: 4, show: true, label: 'Publisher' },
  format: { order: 5, show: true, label: 'Format' },
  __typename: { show: false }
}

const mappings = {}

export default props => {
  const history = useHistory()
  return (
    <GlobalStateContext.Consumer>
      {({ updateGlobalState, selectedProtocols, selectedVariables }) => (
        <DataQuery query={PROTOCOLS_MIN}>
          {({ protocols }) => (
            <ExplorerLayout>
              <ExplorerHeader resetFn={() => updateGlobalState({ selectedProtocols: [] })} />
              <ExplorerTableLayout>
                <Table
                  actions={[<ScrollButton key={1} disabled={selectedProtocols.length > 0 ? false : true} />]}
                  baseId={'protocols-table'}
                  searchbar={true}
                  className={'fixed-table'}
                  defaultPaginationRows={5}
                  selectedIds={selectedProtocols}
                  dataDefinitions={protocolsDataDefinitions}
                  data={protocols}
                  toggleSelect={({ id, selected }) =>
                    updateGlobalState({
                      selectedProtocols: selected
                        ? [...new Set([...selectedProtocols, id])]
                        : [...selectedProtocols].filter(i => i !== id)
                    })
                  }
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
                        clickClose={() =>
                          updateGlobalState({ selectedProtocols: selectedProtocols.filter(sId => sId !== protocol.id) })
                        }
                        clickDownload={() => alert('todo')}
                        clickEdit={() => history.push(`/protocols/${protocol.id}`)}
                      >
                        {/* All Entity Attributes */}
                        <ExplorerSectionLayout
                          sections={[
                            {
                              title: 'Additional Information',
                              subTitle: 'All Available Fields',
                              component: (
                                <FormattedInfo
                                  object={formatAndFilterObjectKeys(protocol, mappings, ([key, val]) =>
                                    ['abstract', '__typename'].includes(key) || typeof val === 'object' ? false : true
                                  )}
                                />
                              )
                            },
                            {
                              title: 'Variables',
                              subTitle: 'Measured by this protocol',
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
                                              updateGlobalState(
                                                { selectedVariables: [...new Set([selectedVariables, id])] },
                                                () => history.push('/variables')
                                              )
                                            }
                                            className="add-on-hover"
                                            key={i}
                                            rightIcon={variableIcon}
                                            leftIcon={iconLink}
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
