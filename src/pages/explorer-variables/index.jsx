import React from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { VARIABLES_MIN, VARIABLE } from '../../graphql/queries'
import Table from '../../modules/table'
import TitleToolbar from '../../modules/title-toolbar'
import { mergeLeft, pickBy } from 'ramda'
import { NoneMessage, FormattedInfo } from '../../modules/shared-components'
import { Grid, Cell, ExpansionList, ExpansionPanel, Button, DataTable, TableHeader, TableRow, TableColumn, TableBody } from 'react-md'

export default () => (
  <DataQuery query={VARIABLES_MIN}>
    {({ variables }) => (
      <Form hoveredVariable={null} selectedVariable={null}>
        {({ updateForm, hoveredVariable, selectedVariable }) => (
          <>
            {/* Page Heading */}
            <TitleToolbar
              t1={selectedVariable ? selectedVariable.name : hoveredVariable ? hoveredVariable.name : 'Select rows by clicking on them...'}
              t2={selectedVariable ? selectedVariable.domain : hoveredVariable ? hoveredVariable.domain : ''}
              t3={selectedVariable ? selectedVariable.class : hoveredVariable ? hoveredVariable.class : ''}
            />

            {/* Main Table (selectable) */}
            <Table
              headers={Object.keys(variables[0]).filter(col => col && col !== '__typename' && col !== 'id')}
              data={variables}
              onRowClick={row => updateForm({ selectedVariable: row })}
              onRowHover={row => updateForm({ hoveredVariable: row })}
              selectedRow={selectedVariable}
              toolbarButtons={[
                <Button
                  key={'url-button'}
                  tooltipPosition={'left'}
                  disabled={selectedVariable ? false : true}
                  tooltipLabel={'Go to <insert URL here>'}
                  style={{ display: 'flex', marginRight: '20px' }}
                  icon
                  onClick={() => alert('todo')}
                >
                  link
                </Button>,
                <Button
                  key={'download-button'}
                  tooltipPosition={'left'}
                  disabled={selectedVariable ? false : true}
                  tooltipLabel={'Download collated information for the selected row'}
                  style={{ display: 'flex', marginRight: '20px' }}
                  icon
                  onClick={() => alert('todo')}
                >
                  picture_as_pdf
                </Button>
              ]}
            />

            {/* Display information about selected row */}
            {selectedVariable ? (
              <DataQuery query={VARIABLE} variables={{ id: selectedVariable.id }}>
                {({ variable }) => (
                  <Grid>
                    <Cell size={12}>
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
                      <h3 style={{ textAlign: 'center', marginTop: '100px', marginBottom: 0 }}>Related Data Products</h3>
                      {variable.dataproducts[0] ? (
                        <Table
                          onRowClick={() => alert('Should this navigate to the clicked data product?')}
                          headers={Object.keys(variable.dataproducts[0]).filter(col => col && col !== '__typename' && col !== 'id')}
                          data={variable.dataproducts.map(d => mergeLeft({}, d))}
                          toolbarStyle={{ backgroundColor: 'transparent' }}
                          tableStyle={{}}
                          toolbarButtons={[]}
                        />
                      ) : (
                        <NoneMessage />
                      )}

                      {/* Related Protocols */}
                      <h3 style={{ textAlign: 'center', marginTop: '100px', marginBottom: 0 }}>Related Protocols</h3>
                      {variable.directly_related_protocols[0] ? (
                        <Table
                          onRowClick={() => alert('Should this navigate to the clicked protocol?')}
                          headers={Object.keys(variable.directly_related_protocols[0])
                            .filter(col => col && col !== '__typename' && col !== 'id')
                            .concat('relationship')}
                          data={variable.directly_related_protocols
                            .map(p => mergeLeft({ relationship: 'direct' }, p))
                            .concat(variable.indirectly_related_protocols.map(p => mergeLeft({ relationship: 'indirect' }, p)))}
                          toolbarStyle={{ backgroundColor: 'transparent' }}
                          tableStyle={{}}
                          toolbarButtons={[]}
                        />
                      ) : (
                        <NoneMessage />
                      )}
                    </Cell>
                  </Grid>
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
          </>
        )}
      </Form>
    )}
  </DataQuery>
)
