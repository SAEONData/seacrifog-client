import React from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { VARIABLES_MIN, VARIABLE } from '../../graphql/queries'
import Table from '../../modules/table'
import TitleToolbar from '../../modules/title-toolbar'
import FormattedInfo from '../../modules/formatted-info'
import { mergeLeft, pickBy } from 'ramda'
import { Grid, Cell, ExpansionList, ExpansionPanel, Button } from 'react-md'

const makeGoToButton = id => (
  <Button onClick={() => alert('this will navigate to the variable that is clicked')} icon>
    remove_red_eye
  </Button>
)

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
              setSelectedRow={row => updateForm({ selectedVariable: row })}
              setHoveredRow={row => updateForm({ hoveredVariable: row })}
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
                        <ExpansionPanel label="Additional Information" footer={false}>
                          {
                            <FormattedInfo
                              object={pickBy((val, key) => {
                                if (['description', '__typename'].includes(key)) return false
                                if (typeof val === 'object') return false
                                return true
                              }, variable)}
                            />
                          }
                        </ExpansionPanel>
                      </ExpansionList>

                      <h3 style={{ textAlign: 'center', marginTop: '40px', marginBottom: 0 }}>Related Protocols</h3>
                      {variable.directly_related_protocols[0] ? (
                        <Table
                          headers={Object.keys(variable.directly_related_protocols[0])
                            .filter(col => col && col !== '__typename' && col !== 'id')
                            .concat('relationship')
                            .concat('')}
                          data={variable.directly_related_protocols
                            .map(p => mergeLeft({ relationship: 'direct', goto: makeGoToButton(p.id) }, p))
                            .concat(
                              variable.indirectly_related_protocols.map(p => mergeLeft({ relationship: 'indirect', goto: makeGoToButton(p.id) }, p))
                            )}
                          toolbarStyle={{ backgroundColor: 'transparent' }}
                          tableStyle={{}}
                          toolbarButtons={[]}
                        />
                      ) : (
                        <p>NONE</p>
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
