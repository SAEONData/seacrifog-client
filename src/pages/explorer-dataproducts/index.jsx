import React from 'react'
import { DATAPRODUCTS_MIN, DATAPRODUCT } from '../../graphql/queries'
import Table from '../../modules/table'
import { mergeLeft, pickBy } from 'ramda'
import { NoneMessage, FormattedInfo, LinkButton, DownloadButton, EditButton } from '../../modules/shared-components'
import { Grid, Cell, ExpansionList, ExpansionPanel, Card } from 'react-md'
import CoverageMap from './coverage-map'
import q from 'query-string'
import DataQuery from '../../modules/data-query'

export default ({ updateForm, hoveredDP, selectedDP, ...props }) => (
  <DataQuery query={DATAPRODUCTS_MIN}>
    {({ dataproducts }) => (
      <>
        <Grid>
          <Cell size={12}>
            {/* Main Table (selectable) */}
            <Grid noSpacing>
              <Cell size={12}>
                <Card tableCard>
                  <Table
                    invisibleHeaders={['EDIT']}
                    headers={Object.keys(dataproducts[0] || '')
                      .filter(col => col !== '__typename' && col !== 'id')
                      .concat('EDIT')}
                    data={dataproducts.map(d => mergeLeft({ EDIT: <EditButton to={`/dataproducts/${d.id}`} /> }, d))}
                    initialSearch={
                      props.history.location.search
                        ? q.parse(props.history.location.search, { ignoreQueryPrefix: true }).searchTerm
                        : selectedDP
                        ? selectedDP.title
                        : ''
                    }
                    onRowClick={row => updateForm({ selectedDP: row })}
                    onRowHover={row => updateForm({ hoveredDP: row })}
                    selectedRow={selectedDP}
                    toolbarButtons={[
                      <LinkButton key={'url-button'} active={selectedDP ? false : true} />,
                      <DownloadButton key={'download-button'} active={selectedDP ? false : true} />
                    ]}
                    resetForm={() => updateForm({ selectedDP: null })}
                  />
                </Card>
              </Cell>

              <Cell size={12}>
                {/* Display information about selected row */}
                {selectedDP ? (
                  <DataQuery query={DATAPRODUCT} variables={{ id: selectedDP.id }}>
                    {({ dataproduct }) => (
                      <Grid noSpacing>
                        <Cell size={12}>
                          <ExpansionList>
                            <ExpansionPanel label="Overview" defaultExpanded footer={false}>
                              {
                                <FormattedInfo
                                  object={pickBy((val, key) => {
                                    if (['title', 'provider', 'publish_year', 'abstract'].includes(key)) return true
                                    else return false
                                  }, dataproduct)}
                                />
                              }
                            </ExpansionPanel>
                            <ExpansionPanel label="Additional Information" footer={false}>
                              {
                                <FormattedInfo
                                  object={pickBy((val, key) => {
                                    if (['abstract', '__typename'].includes(key)) return false
                                    if (typeof val === 'object') return false
                                    return true
                                  }, dataproduct)}
                                />
                              }
                            </ExpansionPanel>
                            <ExpansionPanel className="fix-panel-content-style" label="Spatial Coverage" footer={false}>
                              <div style={{ height: '500px' }}>
                                <CoverageMap geoJson={dataproduct.coverage_spatial} />
                              </div>
                            </ExpansionPanel>
                          </ExpansionList>
                        </Cell>
                        <Cell size={12}>
                          <h3 style={{ marginTop: '100px' }}>Essential Variables</h3>
                          {dataproduct.variables[0] ? (
                            <Card tableCard>
                              <Table
                                onRowClick={row =>
                                  updateForm({ selectedVariable: row }, () =>
                                    props.history.push(`/variables?searchTerm=${row.name}`)
                                  )
                                }
                                headers={Object.keys(dataproduct.variables[0])
                                  .filter(col => col !== '__typename' && col !== 'id')
                                  .concat('relationship')}
                                data={dataproduct.variables.map(v => mergeLeft({ relationship: 'direct' }, v))}
                                hideToolbar
                              />
                            </Card>
                          ) : (
                            <NoneMessage />
                          )}
                        </Cell>
                      </Grid>
                    )}
                  </DataQuery>
                ) : (
                  <FormattedInfo
                    object={{
                      title: selectedDP ? (
                        selectedDP.title
                      ) : hoveredDP ? (
                        hoveredDP.title
                      ) : (
                        <i>Select a row for more detailed information</i>
                      ),
                      provider: selectedDP ? (
                        selectedDP.provider
                      ) : hoveredDP ? (
                        hoveredDP.provider
                      ) : (
                        <i>Select a row for more detailed information</i>
                      ),
                      publish_year: selectedDP ? (
                        selectedDP.publish_year
                      ) : hoveredDP ? (
                        hoveredDP.publish_year
                      ) : (
                        <i>Select a row for more detailed information</i>
                      )
                    }}
                  />
                )}
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </>
    )}
  </DataQuery>
)
