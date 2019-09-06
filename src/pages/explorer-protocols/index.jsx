import React from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import Table from '../../modules/table'
import TitleToolbar from '../../modules/title-toolbar'
import { mergeLeft, pickBy } from 'ramda'
import { GoToButton, NoneMessage, FormattedInfo } from '../../modules/shared-components'
import { Grid, Cell, ExpansionList, ExpansionPanel, Button } from 'react-md'

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
              setSelectedRow={row => updateForm({ selectedProtocol: row })}
              setHoveredRow={row => updateForm({ hoveredProtocol: row })}
              selectedRow={selectedProtocol}
              toolbarButtons={[
                <Button
                  key={'url-button'}
                  tooltipPosition={'left'}
                  disabled={selectedProtocol ? false : true}
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
                  disabled={selectedProtocol ? false : true}
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

                      <h3 style={{ textAlign: 'center', marginTop: '40px', marginBottom: 0 }}>Related Variables</h3>
                      {protocol.directly_related_variables[0] ? (
                        <Table
                          headers={Object.keys(protocol.directly_related_variables[0])
                            .filter(col => col !== '__typename' && col !== 'id')
                            .concat('relationship')
                            .concat('')}
                          data={protocol.directly_related_variables
                            .map(v => mergeLeft({ relationship: 'direct', goto: <GoToButton id={v.id} /> }, v))
                            .concat(
                              protocol.indirectly_related_variables.map(v =>
                                mergeLeft({ relationship: 'indirect', goto: <GoToButton id={v.id} /> }, v)
                              )
                            )}
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
