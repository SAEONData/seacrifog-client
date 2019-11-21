import React from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStateContext } from '../../global-state'
import DataQuery from '../../modules/data-query'
import { VARIABLES_MIN, VARIABLE } from '../../graphql/queries'
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
  dataproductIcon,
  protocolsIcon,
  iconLink
} from '../../modules/shared-components'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import { List, ListItem } from 'react-md'
import { mergeLeft } from 'ramda'
import { Table } from '../../modules/shared-components'

const mappings = {
  rftype: 'Radiative Forcing',
  res_value: 'Resolution',
  res_unit: 'Resolution unit',
  res_comment: 'Resolution comment',
  unc_val: 'uncertainty value',
  unc_unit: 'uncertainty unit',
  unc_comment: 'Comments re. uncertainty'
}

const variablesDataDefinitions = {
  id: { show: true, order: 0, label: 'ID' },
  name: { show: true, order: 1, label: 'Name' },
  class: { show: true, order: 2, label: 'Class' },
  domain: { show: true, order: 3, label: 'Domain' },
  set: { show: true, order: 4, label: 'Set' },
  rftype: { show: true, order: 5, label: 'RF' },
  relevance: { show: true, order: 6, label: 'Relevance' },
  __typename: { show: false }
}

export default props => {
  const history = useHistory()
  return (
    <GlobalStateContext.Consumer>
      {({ updateGlobalState, selectedVariables, selectedDataproducts, selectedProtocols }) => (
        <DataQuery query={VARIABLES_MIN}>
          {({ variables }) => (
            <ExplorerLayout>
              <ExplorerHeader resetFn={() => updateGlobalState({ selectedVariables: [] })} />
              <ExplorerTableLayout>
                <Table
                  actions={[<ScrollButton key={1} disabled={selectedVariables.length > 0 ? false : true} />]}
                  baseId={'variables-table'}
                  searchbar={true}
                  className={'fixed-table'}
                  defaultPaginationRows={5}
                  selectedIds={selectedVariables}
                  dataDefinitions={variablesDataDefinitions}
                  data={variables}
                  toggleSelect={({ id, selected }) =>
                    updateGlobalState({
                      selectedVariables: selected
                        ? [...new Set([...selectedVariables, id])]
                        : [...selectedVariables].filter(i => i !== id)
                    })
                  }
                />
              </ExplorerTableLayout>
              <ExplorerTabsLayout id="selected-variables-tabs" selectedIds={selectedVariables}>
                {({ id }) => (
                  <DataQuery query={VARIABLE} variables={{ id: id }}>
                    {({ variable }) => (
                      <ExplorerEntityLayout
                        title={variable.name}
                        authors={variable.domain}
                        abstract={variable.description}
                        clickClose={() =>
                          updateGlobalState({ selectedVariables: selectedVariables.filter(sId => sId !== variable.id) })
                        }
                        clickDownload={() => alert('todo')}
                        clickEdit={() => history.push(`/variable/${variable.id}`)}
                      >
                        {/* All Entity Attributes */}
                        <ExplorerSectionLayout
                          sections={[
                            // General information
                            {
                              title: 'Additional Information',
                              subTitle: 'All Available Fields',
                              component: (
                                <FormattedInfo
                                  object={formatAndFilterObjectKeys(variable, mappings, ([key, val]) =>
                                    ['description', '__typename'].includes(key) || typeof val === 'object'
                                      ? false
                                      : true
                                  )}
                                />
                              )
                            },

                            // Related protocols
                            {
                              title: 'Protocols',
                              subTitle: 'Used for this variable',
                              component:
                                variable.directly_related_protocols[0] || variable.indirectly_related_protocols[0] ? (
                                  <div>
                                    <List>
                                      {variable.directly_related_protocols
                                        .map(v => mergeLeft({ relationship: 'direct' }, v))
                                        .concat(
                                          variable.indirectly_related_protocols.map(v =>
                                            mergeLeft({ relationship: 'indirect' }, v)
                                          )
                                        )
                                        .sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
                                        .map((protocol, i) => (
                                          <ListItem
                                            onClick={() =>
                                              updateGlobalState(
                                                {
                                                  selectedProtocols: [...new Set([...selectedProtocols, protocol.id])]
                                                },
                                                () => history.push('/protocols')
                                              )
                                            }
                                            className="add-on-hover"
                                            key={i}
                                            rightIcon={protocolsIcon}
                                            leftIcon={iconLink}
                                            primaryText={`${protocol.title}`}
                                          />
                                        ))}
                                    </List>
                                  </div>
                                ) : (
                                  <NoneMessage />
                                )
                            },

                            // Related Data Products
                            {
                              title: 'Data Products',
                              subTitle: 'Using this variable',
                              component: variable.dataproducts[0] ? (
                                <div>
                                  <List>
                                    {variable.dataproducts
                                      .sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
                                      .map((dataproduct, i) => (
                                        <ListItem
                                          onClick={() =>
                                            updateGlobalState(
                                              {
                                                selectedDataproducts: [
                                                  ...new Set([...selectedDataproducts, dataproduct.id])
                                                ]
                                              },
                                              () => history.push('/dataproducts')
                                            )
                                          }
                                          className="add-on-hover"
                                          key={i}
                                          rightIcon={dataproductIcon}
                                          leftIcon={iconLink}
                                          primaryText={`${dataproduct.title}`}
                                        />
                                      ))}
                                  </List>
                                </div>
                              ) : (
                                <NoneMessage />
                              )
                            }

                            // Dataproduct bounding boxes
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
