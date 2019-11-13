import React from 'react'
import DataQuery from '../../modules/data-query'
import { VARIABLES_MIN, VARIABLE } from '../../graphql/queries'
import Table from '../../modules/table'
import { mergeLeft } from 'ramda'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import { NoneMessage, FormattedInfo, LinkButton, DownloadButton, EditButton } from '../../modules/shared-components'
import q from 'query-string'
import {
  Grid,
  Cell,
  ExpansionList,
  ExpansionPanel,
  DataTable,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  Card
} from 'react-md'

const mappings = {
  rftype: 'Radiative Forcing',
  res_value: 'Resolution',
  res_unit: 'Resolution unit',
  res_comment: 'Resolution comment',
  unc_val: 'uncertainty value',
  unc_unit: 'uncertainty unit',
  unc_comment: 'Comments re. uncertainty'
}

export default ({ updateForm, hoveredVariable, selectedVariable, ...props }) => (
  <DataQuery query={VARIABLES_MIN}>
    {({ variables }) => (
      <Grid>
        <Cell size={12}>
          {/* Main Table (selectable) */}
          <Card tableCard>
            <Table
              invisibleHeaders={['EDIT']}
              unlickableCols={['EDIT']}
              headers={Object.keys(variables[0])
                .filter(col => col && col !== '__typename' && col !== 'id')
                .concat('EDIT')}
              data={variables.map(v => mergeLeft({ EDIT: <EditButton to={`/variables/${v.id}`} /> }, v))}
              initialSearch={
                props.history.location.search
                  ? q.parse(props.history.location.search, { ignoreQueryPrefix: true }).searchTerm
                  : selectedVariable
                  ? selectedVariable.name
                  : ''
              }
              onRowClick={row => updateForm({ selectedVariable: row })}
              onRowHover={row => updateForm({ hoveredVariable: row })}
              selectedRow={selectedVariable}
              toolbarButtons={[
                <LinkButton key={'url-button'} active={selectedVariable ? false : true} />,
                <DownloadButton key={'download-button'} active={selectedVariable ? false : true} />
              ]}
              resetForm={() => updateForm({ selectedVariable: null })}
            />
          </Card>
          {/* Display information about selected row */}
          {selectedVariable ? (
            <DataQuery query={VARIABLE} variables={{ id: selectedVariable.id }}>
              {({ variable }) => (
                <>
                  <ExpansionList>
                    <ExpansionPanel label="Overview" defaultExpanded footer={false}>
                      {
                        <FormattedInfo
                          object={formatAndFilterObjectKeys(variable, mappings, ([key, val]) =>
                            ['name', 'domain', 'class', 'description'].includes(key)
                          )}
                        />
                      }
                    </ExpansionPanel>
                    <ExpansionPanel label="General Information" footer={false}>
                      {
                        <FormattedInfo
                          object={formatAndFilterObjectKeys(variable, mappings, ([key, val]) =>
                            ['description', '__typename'].includes(key) || typeof val === 'object' ? false : true
                          )}
                        />
                      }
                    </ExpansionPanel>
                    <ExpansionPanel label="Requirements for Variable Observation and Data Products" footer={false}>
                      {
                        <FormattedInfo
                          object={{
                            'Observation Frequency': `${variable.frequency_value} ${variable.frequency_unit} (${variable.frequency_comment})`,
                            'Spatial Resolution': `${variable.res_value} ${variable.res_unit} (${variable.res_comment})`,
                            'Maximum Uncertainty': `${variable.unc_val} ${variable.unc_unit} (${variable.unc_comment})`,
                            'Requirement defined by': `${variable.req_source}`,
                            'Further information': `${variable.req_uri}`
                          }}
                        />
                      }
                    </ExpansionPanel>
                    <ExpansionPanel label="Role of variable in Radiative Forcing" footer={false}>
                      <p>
                        Below figures are simple aggregates of global figures from the IPCC 5th Assessment Report and
                        are only meant to provide a very coarse guidance with regards to sign and magnitude of
                        uncertainty of the variable's contribution to radiative forcing on the African continent. Also
                        shown are related RF components (Global Values)
                      </p>
                      {
                        <FormattedInfo
                          object={{
                            'Variable Type': variable.rftype,
                            'Total RF best est. (Wm-2)': Math.max.apply(Math, variable.rforcings.map(rf => rf.max)),
                            'Total RF uncertainty (absolute, Wm-2)': 'TODO - Get maths calc',
                            'Total RF uncertainty (relative, %)': 'TODO - Get maths calc'
                          }}
                        />
                      }
                      <DataTable fullWidth={false} plain>
                        <TableHeader>
                          <TableRow>
                            <TableColumn style={{ textAlign: 'center' }}>Category</TableColumn>
                            <TableColumn style={{ textAlign: 'center' }}>Compound</TableColumn>
                            <TableColumn style={{ textAlign: 'center' }}>Best Estimate (Wm-2)</TableColumn>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {variable.rforcings.map(rf => (
                            <TableRow key={rf.compound}>
                              <TableColumn>{rf.category}</TableColumn>
                              <TableColumn>{rf.compound}</TableColumn>
                              <TableColumn>{rf.best}</TableColumn>
                            </TableRow>
                          ))}
                        </TableBody>
                      </DataTable>
                    </ExpansionPanel>
                  </ExpansionList>

                  {/* Related Data Products */}
                  <h3 style={{ marginTop: '100px' }}>Related Data Products</h3>
                  {variable.dataproducts[0] ? (
                    <Card tableCard>
                      <Table
                        onRowClick={row =>
                          updateForm({ selectedDP: row }, () =>
                            props.history.push(`/dataproducts?searchTerm=${row.title}`)
                          )
                        }
                        headers={Object.keys(variable.dataproducts[0]).filter(
                          col => col && col !== '__typename' && col !== 'id'
                        )}
                        data={variable.dataproducts.map(d => mergeLeft({}, d))}
                        hideToolbar
                      />
                    </Card>
                  ) : (
                    <NoneMessage />
                  )}

                  {/* Related Protocols */}
                  <h3 style={{ marginTop: '100px' }}>Related Protocols</h3>
                  {variable.directly_related_protocols[0] ? (
                    <Card tableCard>
                      <Table
                        onRowClick={row =>
                          updateForm({ selectedProtocol: row }, () =>
                            props.history.push(`/protocols?searchTerm=${row.title}`)
                          )
                        }
                        headers={Object.keys(variable.directly_related_protocols[0])
                          .filter(col => col && col !== '__typename' && col !== 'id')
                          .concat('relationship')}
                        data={variable.directly_related_protocols
                          .map(p => mergeLeft({ relationship: 'direct' }, p))
                          .concat(
                            variable.indirectly_related_protocols.map(p => mergeLeft({ relationship: 'indirect' }, p))
                          )}
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
                  name: selectedVariable ? (
                    selectedVariable.name
                  ) : hoveredVariable ? (
                    hoveredVariable.name
                  ) : (
                    <i>Select a row for more detailed information</i>
                  ),
                  domain: selectedVariable ? (
                    selectedVariable.domain
                  ) : hoveredVariable ? (
                    hoveredVariable.domain
                  ) : (
                    <i>Select a row for more detailed information</i>
                  ),
                  class: selectedVariable ? (
                    selectedVariable.class
                  ) : hoveredVariable ? (
                    hoveredVariable.class
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
