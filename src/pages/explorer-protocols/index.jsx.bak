import React from 'react'
import DataQuery from '../../modules/data-query'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import Table from '../../modules/table'
import { mergeLeft } from 'ramda'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import { NoneMessage, FormattedInfo, LinkButton, DownloadButton, EditButton } from '../../modules/shared-components'
import q from 'query-string'
import { Grid, Cell, ExpansionList, ExpansionPanel, Card } from 'react-md'

const mappings = {}

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
                            object={formatAndFilterObjectKeys(protocol, mappings, ([key, val]) =>
                              ['title', 'author', 'domain', 'abstract'].includes(key)
                            )}
                          />
                        }
                      </ExpansionPanel>
                      <ExpansionPanel label="Additional Information" footer={false}>
                        {
                          <FormattedInfo
                            object={formatAndFilterObjectKeys(protocol, mappings, ([key, val]) =>
                              ['abstract', '__typename'].includes(key) || typeof val === 'object' ? false : true
                            )}
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
                object={formatAndFilterObjectKeys(
                  {
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
                  },
                  mappings
                )}
              />
            )}
          </Cell>
        </Grid>
      </>
    )}
  </DataQuery>
)
