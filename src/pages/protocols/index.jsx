import React from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import {
  Card,
  CardTitle,
  CardText,
  Toolbar,
  Grid,
  Cell,
  DataTable,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  Tab,
  Tabs,
  TabsContainer,
  Divider
} from 'react-md'

// eslint-disable-next-line no-extend-native
String.prototype.truncate = function(length, ending) {
  length = length || 100
  ending = ending || '...'
  if (this.length > length) return this.substring(0, length - ending.length) + ending
  else return this
}

// Debouncing function - timer needs to be outside the function scope
let timer
const debounce = (cb, duration) => (...args) => {
  clearTimeout(timer)
  timer = setTimeout(() => cb(...args), duration)
}

export default () => (
  <DataQuery query={PROTOCOLS_MIN}>
    {({ protocols }) => (
      <Form hoveredRow={null} selectedRow={null}>
        {({ updateForm, hoveredRow, selectedRow }) => (
          <TabsContainer colored toolbar={<Toolbar zDepth={0} prominent title="Tools (i.e. search) go here" />} style={{ margin: '0 -8px' }}>
            <Tabs tabId="simple-tab">
              <Tab label="Variables">
                <p>
                  <b>Hello, World!</b>
                </p>
              </Tab>
              <Tab label="Protocols">
                <Grid style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Cell style={{ marginLeft: 0 }} phoneSize={6} tabletSize={8} size={6}>
                    <DataTable plain>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(protocols[0])
                            .filter(col => col !== '__typename' && col !== 'id')
                            .map(header => (
                              <TableColumn key={`header-col-${header}`} style={{ textAlign: 'center' }}>
                                {header}
                              </TableColumn>
                            ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {protocols.slice(1).map((row, i) => (
                          <TableRow
                            className={row.id === (selectedRow || {}).id ? 'selected-row' : ''}
                            key={`table-row-${i}`}
                            onMouseOver={debounce(() => updateForm({ hoveredRow: row }), 250)}
                            onClick={() => {
                              if ((selectedRow || {}).id !== row.id) updateForm({ selectedRow: row })
                              else updateForm({ selectedRow: null })
                            }}
                          >
                            {Object.keys(row)
                              .filter(col => col !== '__typename' && col !== 'id')
                              .map((col, j) => (
                                <TableColumn key={`table-col-${i}-${j}`} style={{ cursor: 'pointer' }}>
                                  {row[col].toString().truncate(30)}
                                </TableColumn>
                              ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </DataTable>
                  </Cell>
                  <Cell phoneSize={6} tabletSize={8} size={6}>
                    <Card style={{ width: '100%' }}>
                      <CardTitle
                        title={`Protocol (ID: ${selectedRow ? selectedRow.id : hoveredRow ? hoveredRow.id : '-'})`}
                        subtitle={selectedRow ? selectedRow.title : hoveredRow ? hoveredRow.title : '(Hover on a row for extended info)'}
                      />
                      <CardText>
                        <p>
                          <b>Author</b>
                        </p>
                        <p>{selectedRow ? selectedRow.author : hoveredRow ? hoveredRow.author : ''}</p>
                        <p>
                          <b>Domain</b>
                        </p>
                        <p>{selectedRow ? selectedRow.domain : hoveredRow ? hoveredRow.domain : ''}</p>
                        <p>
                          <b>Published</b>
                        </p>
                        <p>{selectedRow ? selectedRow.publish_year : hoveredRow ? hoveredRow.publish_year : ''}</p>
                      </CardText>
                      <Divider />
                      <CardText>
                        {selectedRow ? (
                          <DataQuery query={PROTOCOL} variables={{ id: selectedRow.id }}>
                            {({ protocol }) => (
                              <>
                                <p>
                                  <b>Abstract</b>
                                </p>
                                <p>{protocol.abstract}</p>
                                <p>
                                  <b>Thematic category</b>
                                </p>
                                <p>{protocol.category}</p>
                                <p>
                                  <b>Purpose</b>
                                </p>
                                <p>
                                  <b>DOI/ISBN/ISSN</b>
                                </p>
                                <p>{protocol.doi}</p>
                                <p>
                                  <b>Publisher</b>
                                </p>
                                <p>{protocol.publisher}</p>
                                <p>
                                  <b>Coverage</b>
                                </p>
                                <p>{protocol.coverage_type}</p>
                                <p>
                                  <b>Purpose</b>
                                </p>
                                <p>{protocol.purpose}</p>

                                <p>
                                  <b>License</b>
                                </p>
                                <p>{protocol.license}</p>

                                <p>
                                  <b>Language</b>
                                </p>
                                <p>{protocol.language}</p>

                                <p>
                                  <b>Format</b>
                                </p>
                                <p>{protocol.format}</p>

                                <p>
                                  <b>Sustainability</b>
                                </p>
                                <p>{protocol.sustainability}</p>
                              </>
                            )}
                          </DataQuery>
                        ) : (
                          <p>
                            <i>Select a row for more detailed information</i>
                          </p>
                        )}
                      </CardText>
                    </Card>
                  </Cell>
                </Grid>
              </Tab>
            </Tabs>
          </TabsContainer>
        )}
      </Form>
    )}
  </DataQuery>
)
