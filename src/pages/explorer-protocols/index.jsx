import React from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import Table from '../../modules/table'
import TitleToolbar from '../../modules/title-toolbar'
import { mergeLeft, pickBy } from 'ramda'
import { NoneMessage, FormattedInfo, LinkButton, DownloadButton } from '../../modules/shared-components'
import { Grid, Cell, ExpansionList, ExpansionPanel, Card } from 'react-md'

export default () => (
  <DataQuery query={PROTOCOLS_MIN}>
    {({ protocols }) => (
      <Form hoveredProtocol={null} selectedProtocol={null}>
        {({ updateForm, hoveredProtocol, selectedProtocol }) => (
          <>
            {/* Page Heading */}
            <TitleToolbar
              t1={selectedProtocol ? selectedProtocol.title : hoveredProtocol ? hoveredProtocol.title : 'Select rows by clicking on them...'}
              t2={selectedProtocol ? selectedProtocol.author : hoveredProtocol ? hoveredProtocol.author : ''}
              t3={selectedProtocol ? selectedProtocol.domain : hoveredProtocol ? hoveredProtocol.domain : ''}
            />

            {/* Main Table (selectable) */}
            <Table
              headers={Object.keys(protocols[0] || '').filter(col => col !== '__typename' && col !== 'id')}
              data={protocols}
              onRowClick={row => updateForm({ selectedProtocol: row })}
              onRowHover={row => updateForm({ hoveredProtocol: row })}
              selectedRow={selectedProtocol}
              toolbarButtons={[<LinkButton active={selectedProtocol ? false : true} />, <DownloadButton active={selectedProtocol ? false : true} />]}
            />

            {/* Display information about selected row */}
            {selectedProtocol ? (
              <DataQuery query={PROTOCOL} variables={{ id: selectedProtocol.id }}>
                {({ protocol }) => (
                  <Grid>
                    <Cell size={12}>
                      <ExpansionList>
                        <ExpansionPanel label="Abstract" defaultExpanded footer={false}>
                          <Grid>
                            <Cell size={12}>
                              <p>{protocol.abstract}</p>
                            </Cell>
                          </Grid>
                        </ExpansionPanel>
                        <ExpansionPanel label="Additional Information" footer={false}>
                          {
                            <FormattedInfo
                              object={pickBy((val, key) => {
                                if (['abstract', '__typename'].includes(key)) return false
                                if (typeof val === 'object') return false
                                return true
                              }, protocol)}
                            />
                          }
                        </ExpansionPanel>
                      </ExpansionList>

                      <h3 style={{ textAlign: 'center', marginTop: '100px', marginBottom: '50px' }}>Related Variables</h3>
                      {protocol.directly_related_variables[0] ? (
                        <Card tableCard>
                          <Table
                            onRowClick={() => alert('Should this navigate to the clicked variable?')}
                            headers={Object.keys(protocol.directly_related_variables[0])
                              .filter(col => col !== '__typename' && col !== 'id')
                              .concat('relationship')}
                            data={protocol.directly_related_variables
                              .map(v => mergeLeft({ relationship: 'direct' }, v))
                              .concat(protocol.indirectly_related_variables.map(v => mergeLeft({ relationship: 'indirect' }, v)))}
                            toolbarStyle={{ backgroundColor: 'transparent' }}
                            tableStyle={{}}
                            toolbarButtons={[]}
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
