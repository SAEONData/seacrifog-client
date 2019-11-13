import React from 'react'
import { DATAPRODUCTS_MIN, DATAPRODUCT } from '../../graphql/queries'
import Table from '../../modules/table'
import { mergeLeft } from 'ramda'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import { NoneMessage, FormattedInfo, LinkButton, DownloadButton, EditButton } from '../../modules/shared-components'
import { Grid, Cell, ExpansionList, ExpansionPanel, Card } from 'react-md'
import CoverageMap from './coverage-map'
import q from 'query-string'
import DataQuery from '../../modules/data-query'

const mappings = {
  res_spatial: 'Spatial resolution',
  res_spatial_unit: 'Spatial resolution unit',
  url_download: 'Download URL',
  url_info: 'Info URL',
  res_temperature: 'Temperature resolution',
  res_temperature_unit: 'Temperature resolution unit'
}

export default ({ updateForm, hoveredDP, selectedDP, ...props }) => (
  <DataQuery query={DATAPRODUCTS_MIN}>
    {({ dataproducts }) => (
      <Grid>
        <Cell size={12}>
          {/* Main Table (selectable) */}
          <Card tableCard>
            <Table
              invisibleHeaders={['EDIT']}
              unlickableCols={['EDIT']}
              headers={Object.keys(dataproducts[0] || '')
                .filter(col => col && col !== '__typename' && col !== 'id')
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

          {/* Display information about selected row */}
          {selectedDP ? (
            <DataQuery query={DATAPRODUCT} variables={{ id: selectedDP.id }}>
              {({ dataproduct }) => (
                <>
                  <ExpansionList>
                    <ExpansionPanel label="Overview" defaultExpanded footer={false}>
                      {
                        <FormattedInfo
                          object={formatAndFilterObjectKeys(dataproduct, mappings, ([key, val]) =>
                            ['title', 'provider', 'publish_year', 'abstract'].includes(key)
                          )}
                        />
                      }
                    </ExpansionPanel>
                    <ExpansionPanel label="Additional Information" footer={false}>
                      {
                        <FormattedInfo
                          object={formatAndFilterObjectKeys(dataproduct, mappings, ([key, val]) =>
                            ['abstract', '__typename'].includes(key) || typeof val === 'object' ? false : true
                          )}
                        />
                      }
                    </ExpansionPanel>
                    <ExpansionPanel className="fix-panel-content-style" label="Spatial Coverage" footer={false}>
                      <div style={{ height: '400px', width: '100%', position: 'relative' }}>
                        <CoverageMap geoJson={dataproduct.coverage_spatial} />
                      </div>
                    </ExpansionPanel>
                  </ExpansionList>

                  {/* Essential Variables */}
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
                </>
              )}
            </DataQuery>
          ) : (
            <FormattedInfo
              object={formatAndFilterObjectKeys(
                {
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
                },
                mappings
              )}
            />
          )}
        </Cell>
      </Grid>
    )}
  </DataQuery>
)
