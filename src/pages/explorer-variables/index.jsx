import React from 'react'
import DataQuery from '../../modules/data-query'
import { VARIABLES_MIN, VARIABLE } from '../../graphql/queries'
import Table from '../../modules/table'
import TitleToolbar from '../../modules/title-toolbar'
import { mergeLeft, pickBy } from 'ramda'
import { NoneMessage, FormattedInfo, LinkButton, DownloadButton, EditButton } from '../../modules/shared-components'
import q from 'query-string'
import { Grid, Cell, ExpansionList, ExpansionPanel, DataTable, TableHeader, TableRow, TableColumn, TableBody, Card } from 'react-md'

export default ({ updateForm, hoveredVariable, selectedVariable, ...props }) => (
  <DataQuery query={VARIABLES_MIN}>
    {({ variables }) => (
      <>
        {/* Page Heading */}
        <TitleToolbar
          t1={selectedVariable ? selectedVariable.name : hoveredVariable ? hoveredVariable.name : 'Select rows by clicking on them...'}
          t2={selectedVariable ? selectedVariable.domain : hoveredVariable ? hoveredVariable.domain : ''}
          t3={selectedVariable ? selectedVariable.class : hoveredVariable ? hoveredVariable.class : ''}
        />

        {/* Main Table (selectable) */}
        <Grid>
          <Cell size={12}>
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
                      <ExpansionPanel label="Description" defaultExpanded footer={false}>
                        <Grid>
                          <Cell size={12}>
                            <p>{variable.description}</p>
                          </Cell>
                        </Grid>
                      </ExpansionPanel>
                      <ExpansionPanel label="General Information" footer={false}>
                        {
                          <FormattedInfo
                            object={pickBy((val, key) => {
                              if (
                                [
                                  'description',
                                  '__typename',
                                  'frequency_value',
                                  'frequency_unit',
                                  'frequency_comment',
                                  'res_value',
                                  'res_unit',
                                  'rftype',
                                  'res_comment',
                                  'unc_val',
                                  'unc_unit',
                                  'unc_comment',
                                  'req_source',
                                  'req_uri'
                                ].includes(key)
                              )
                                return false
                              if (typeof val === 'object') return false
                              return true
                            }, variable)}
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
                          Below figures are simple aggregates of global figures from the IPCC 5th Assessment Report and are only meant to provide a
                          very coarse guidance with regards to sign and magnitude of uncertainty of the variable's contribution to radiative forcing
                          on the African continent. Also shown are related RF components (Global Values)
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
                    <h3 style={{ textAlign: 'center', marginTop: '100px', marginBottom: '50px' }}>Related Data Products</h3>
                    {variable.dataproducts[0] ? (
                      <Card tableCard>
                        <Table
                          onRowClick={row => updateForm({ selectedDP: row }, () => props.history.push(`/dataproducts?searchTerm=${row.title}`))}
                          headers={Object.keys(variable.dataproducts[0]).filter(col => col && col !== '__typename' && col !== 'id')}
                          data={variable.dataproducts.map(d => mergeLeft({}, d))}
                          tableStyle={{}}
                          toolbarButtons={[]}
                        />
                      </Card>
                    ) : (
                      <NoneMessage />
                    )}

                    {/* Related Protocols */}
                    <h3 style={{ textAlign: 'center', marginTop: '100px', marginBottom: '50px' }}>Related Protocols</h3>
                    {variable.directly_related_protocols[0] ? (
                      <Card tableCard>
                        <Table
                          onRowClick={row => updateForm({ selectedProtocol: row }, () => props.history.push(`/protocols?searchTerm=${row.title}`))}
                          headers={Object.keys(variable.directly_related_protocols[0])
                            .filter(col => col && col !== '__typename' && col !== 'id')
                            .concat('relationship')}
                          data={variable.directly_related_protocols
                            .map(p => mergeLeft({ relationship: 'direct' }, p))
                            .concat(variable.indirectly_related_protocols.map(p => mergeLeft({ relationship: 'indirect' }, p)))}
                          tableStyle={{}}
                          toolbarButtons={[]}
                        />
                      </Card>
                    ) : (
                      <NoneMessage />
                    )}
                  </>
                )}
              </DataQuery>
            ) : (
              <Grid>
                <Cell size={12}>
                  <p>
                    <i>Select a row for more detailed information</i>
                  </p>
                </Cell>
              </Grid>
            )}
          </Cell>
        </Grid>
      </>
    )}
  </DataQuery>
)
