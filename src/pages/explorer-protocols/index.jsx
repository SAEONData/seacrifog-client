import React from 'react'
import DataQuery from '../../modules/data-query'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import Table from '../../modules/table'
import { mergeLeft, pickBy } from 'ramda'
import { NoneMessage, FormattedInfo, LinkButton, DownloadButton, EditButton } from '../../modules/shared-components'
import q from 'query-string'
import { Grid, Cell, ExpansionList, ExpansionPanel, Card } from 'react-md'

export default ({ updateForm, hoveredProtocol, selectedProtocol, ...props }) => (
  <DataQuery query={PROTOCOLS_MIN}>
    {({ protocols }) => (
      <>
        {/* Main Table (selectable) */}
        <Grid>
          <Cell size={12}>
            <Card tableCard>
              <Table
                invisibleHeaders={['EDIT']}
                headers={Object.keys(protocols[0] || '')
                  .filter(col => col !== '__typename' && col !== 'id')
                  .concat('EDIT')}
                data={protocols.map(p => mergeLeft({ EDIT: <EditButton to={`/protocols/${p.id}`} /> }, p))}
                initialSearch={
                  props.history.location.search
                    ? q.parse(props.history.location.search, { ignoreQueryPrefix: true }).searchTerm
                    : selectedProtocol
                    ? selectedProtocol.title
                    : ''
                }
                onRowClick={row => updateForm({ selectedProtocol: row })}
                onRowHover={row => updateForm({ hoveredProtocol: row })}
                selectedRow={selectedProtocol}
                toolbarButtons={[
                  <LinkButton key={'url-button'} active={selectedProtocol ? false : true} />,
                  <DownloadButton key={'download-button'} active={selectedProtocol ? false : true} />
                ]}
                resetForm={() => updateForm({ selectedProtocol: null })}
              />
            </Card>

            {/* Display information about selected row */}
            {selectedProtocol ? (
              <DataQuery query={PROTOCOL} variables={{ id: selectedProtocol.id }}>
                {({ protocol }) => (
                  <>
                    <ExpansionList>
                      <ExpansionPanel label="Overview" defaultExpanded footer={false}>
                        {
                          <FormattedInfo
                            object={pickBy((val, key) => {
                              if (['title', 'author', 'domain', 'abstract'].includes(key)) return true
                              else return false
                            }, protocol)}
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
                            }, protocol)}
                          />
                        }
                      </ExpansionPanel>
                    </ExpansionList>

                    <h3 style={{ marginTop: '100px' }}>Related Variables</h3>
                    {protocol.directly_related_variables[0] ? (
                      <Card tableCard>
                        <Table
                          onRowClick={row =>
                            updateForm({ selectedVariable: row }, () =>
                              props.history.push(`/variables?searchTerm=${row.name}`)
                            )
                          }
                          headers={Object.keys(protocol.directly_related_variables[0])
                            .filter(col => col !== '__typename' && col !== 'id')
                            .concat('relationship')}
                          data={protocol.directly_related_variables
                            .map(v => mergeLeft({ relationship: 'direct' }, v))
                            .concat(
                              protocol.indirectly_related_variables.map(v => mergeLeft({ relationship: 'indirect' }, v))
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
                object={{
                  title: selectedProtocol ? (
                    selectedProtocol.title
                  ) : hoveredProtocol ? (
                    hoveredProtocol.title
                  ) : (
                    <i>Select a row for more detailed information</i>
                  ),
                  author: selectedProtocol ? (
                    selectedProtocol.author
                  ) : hoveredProtocol ? (
                    hoveredProtocol.author
                  ) : (
                    <i>Select a row for more detailed information</i>
                  ),
                  domain: selectedProtocol ? (
                    selectedProtocol.domain
                  ) : hoveredProtocol ? (
                    hoveredProtocol.domain
                  ) : (
                    <i>Select a row for more detailed information</i>
                  )
                }}
              />
            )}
          </Cell>
        </Grid>
      </>
    )}
  </DataQuery>
)
