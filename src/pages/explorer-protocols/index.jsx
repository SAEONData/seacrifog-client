import React from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import Table from '../../modules/table'
import { mergeLeft } from 'ramda'
import { Toolbar, Grid, Cell, ExpansionList, ExpansionPanel, Button } from 'react-md'

const makeGoToButton = id => (
  <Button onClick={() => alert('this will navigate to the variable that is clicked')} icon>
    remove_red_eye
  </Button>
)

export default ({ tab }) => (
  <DataQuery query={PROTOCOLS_MIN}>
    {({ protocols }) => (
      <Form hoveredRow={null} selectedProtocol={null}>
        {({ updateForm, hoveredProtocol, selectedProtocol }) => (
          <>
            <Toolbar className={'md-grid'} zDepth={0} prominent>
              <Cell size={12} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '20px', lineHeight: '28px' }}>
                  {selectedProtocol ? selectedProtocol.title : hoveredProtocol ? hoveredProtocol.title : 'Select rows by clicking on them...'}
                </p>
                <p style={{ fontSize: '15px' }}>{selectedProtocol ? selectedProtocol.author : hoveredProtocol ? hoveredProtocol.author : ''}</p>
                <p style={{ fontSize: '15px' }}>{selectedProtocol ? selectedProtocol.domain : hoveredProtocol ? hoveredProtocol.domain : ''}</p>
              </Cell>
            </Toolbar>

            <Table
              headers={Object.keys(protocols[0]).filter(col => col !== '__typename' && col !== 'id')}
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

            {selectedProtocol ? (
              <DataQuery query={PROTOCOL} variables={{ id: selectedProtocol.id }}>
                {({ protocol }) => (
                  <Grid>
                    <Cell size={12}>
                      <ExpansionList>
                        <ExpansionPanel animateContent={false} label="Abstract" defaultExpanded footer={false}>
                          <Grid>
                            <Cell size={12}>
                              <p>{protocol.abstract}</p>
                            </Cell>
                          </Grid>
                        </ExpansionPanel>
                        <ExpansionPanel animateContent={false} label="Additional Information" footer={false}>
                          <Grid>
                            <Cell phoneSize={6} tabletSize={8} size={6}>
                              <p>
                                <b>Thematic category</b> {protocol.category}
                              </p>
                              <p>
                                <b>DOI/ISBN/ISSN</b> {protocol.doi}
                              </p>
                              <p>
                                <b>Publisher</b> {protocol.publisher}
                              </p>
                              <p>
                                <b>Coverage</b> {protocol.coverage_type}
                              </p>
                              <p>
                                <b>Purpose</b> {protocol.purpose}
                              </p>
                            </Cell>
                            <Cell phoneSize={6} tabletSize={8} size={6}>
                              <p>
                                <b>Published</b> {protocol.publish_year}
                              </p>
                              <p>
                                <b>License</b> {protocol.license}
                              </p>
                              <p>
                                <b>Language</b> {protocol.language}
                              </p>
                              <p>
                                <b>Format</b> {protocol.format}
                              </p>
                              <p>
                                <b>Sustainability</b> {protocol.sustainability}
                              </p>
                            </Cell>
                          </Grid>
                        </ExpansionPanel>
                        <ExpansionPanel animateContent={false} label="Related Variables" defaultExpanded footer={false}>
                          <Form hoveredVariable={null} selectedVariable={null}>
                            {({ updateForm: updateVariablesForm, selectedVariable, hoveredVariable }) => (
                              <Table
                                headers={Object.keys(protocol.directly_related_variables[0])
                                  .filter(col => col !== '__typename' && col !== 'id')
                                  .concat('relationship')
                                  .concat('')}
                                data={protocol.directly_related_variables
                                  .map(v => mergeLeft({ relationship: 'direct', goto: makeGoToButton(v.id) }, v))
                                  .concat(
                                    protocol.indirectly_related_variables.map(v =>
                                      mergeLeft({ relationship: 'indirect', goto: makeGoToButton(v.id) }, v)
                                    )
                                  )}
                                toolbarStyle={{ backgroundColor: 'transparent' }}
                                tableStyle={{}}
                                setHoveredRow={row => updateVariablesForm({ hoveredVariable: row })}
                                selectedRow={selectedVariable}
                                toolbarButtons={[]}
                              />
                            )}
                          </Form>
                        </ExpansionPanel>
                      </ExpansionList>
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
