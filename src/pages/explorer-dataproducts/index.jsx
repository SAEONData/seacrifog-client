import React from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStateContext } from '../../global-state'
import DataQuery from '../../modules/data-query'
import { DATAPRODUCTS_MIN, DATAPRODUCT } from '../../graphql/queries'
import {
  NoneMessage,
  FormattedInfo,
  ExplorerHeader,
  ExplorerLayout,
  ExplorerTableLayout,
  ExplorerTabsLayout,
  ExplorerEntityLayout,
  ExplorerAttributeLayout,
  ScrollButton,
  variableIcon,
  VariableIconLink
} from '../../modules/shared-components'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import CoverageMap from './coverage-map'
import { List, ListItem } from 'react-md'
import { Table } from '../../modules/shared-components'

const mappings = []
const dataproductsDataDefinitions = {
  id: { order: 0, show: true, label: 'ID' },
  title: { order: 1, show: true, label: 'Dataset' },
  provider: { order: 2, show: true, label: 'Provider' },
  author: { order: 3, show: true, label: 'Author' },
  publish_year: { order: 4, show: true, label: 'Publish Year' },
  keywords: { order: 5, show: true, label: 'Keywords' },
  __typename: { show: false }
}

export default props => {
  const history = useHistory()
  return (
    <GlobalStateContext.Consumer>
      {({ updateGlobalState, selectedDataproducts, selectedVariables }) => (
        <DataQuery query={DATAPRODUCTS_MIN}>
          {({ dataproducts }) => (
            <ExplorerLayout>
              <ExplorerHeader resetFn={() => updateGlobalState({ selectedDataproducts: [] })} />
              <ExplorerTableLayout>
                <Table
                  actions={[
                    <ScrollButton
                      key={1}
                      disabled={selectedDataproducts.length > 0 ? false : true}
                      click={() => alert('This will make the page scroll down')}
                    />
                  ]}
                  baseId={'dataproducts-table'}
                  searchbar={true}
                  className={'fixed-table'}
                  defaultPaginationRows={5}
                  selectedIds={selectedDataproducts}
                  dataDefinitions={dataproductsDataDefinitions}
                  data={dataproducts}
                  toggleSelect={({ id, selected }) =>
                    updateGlobalState({
                      selectedDataproducts: selected
                        ? [...new Set([...selectedDataproducts, id])]
                        : [...selectedDataproducts].filter(i => i !== id)
                    })
                  }
                />
              </ExplorerTableLayout>
              <ExplorerTabsLayout id="selected-dataproducts-tabs" selectedIds={selectedDataproducts}>
                {({ id }) => (
                  <DataQuery query={DATAPRODUCT} variables={{ id: id }}>
                    {({ dataproduct }) => (
                      <ExplorerEntityLayout
                        title={dataproduct.title}
                        authors={dataproduct.author}
                        abstract={dataproduct.abstract}
                        clickClose={() =>
                          updateGlobalState({
                            selectedDataproducts: selectedDataproducts.filter(sId => sId !== dataproduct.id)
                          })
                        }
                        clickDownload={() => alert('todo')}
                        clickEdit={() => history.push(`/dataproducts/${dataproduct.id}`)}
                      >
                        {/* All Entity Attributes */}
                        <ExplorerAttributeLayout
                          sections={[
                            {
                              title: 'Additional Information',
                              subTitle: 'All Available Fields',
                              component: (
                                <FormattedInfo
                                  object={formatAndFilterObjectKeys(dataproduct, mappings, ([key, val]) =>
                                    ['abstract', '__typename'].includes(key) || typeof val === 'object' ? false : true
                                  )}
                                />
                              )
                            },
                            {
                              title: 'Essential Variables',
                              subTitle: 'For this Data Product',
                              component: dataproduct.variables[0] ? (
                                <div>
                                  <List>
                                    {dataproduct.variables
                                      .sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
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
                                          leftIcon={VariableIconLink}
                                          primaryText={`${variable.name}`}
                                        />
                                      ))}
                                  </List>
                                </div>
                              ) : (
                                <NoneMessage />
                              )
                            },
                            {
                              title: 'Spatial Coverage',
                              subTitle: 'By bounding box',
                              component: <CoverageMap geoJson={dataproduct.coverage_spatial} />,
                              grid: {
                                size: 12
                              }
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
