import React, { PureComponent } from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import {
  Card,
  CardTitle,
  CardText,
  Toolbar,
  TextField,
  Button,
  DataTable,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  Tab,
  Tabs,
  TabsContainer,
  Divider,
  TablePagination,
  Paper,
  Grid,
  Cell,
  TableFooter,
  ExpansionList,
  ExpansionPanel
} from 'react-md'

// eslint-disable-next-line no-extend-native
String.prototype.truncate = function(length, ending) {
  length = length || 100
  ending = ending || '..'
  if (this.length > length) return this.substring(0, length - ending.length) + ending
  else return this
}

// Debouncing function - timer needs to be outside the function scope
let timer
const debounce = (cb, duration) => (...args) => {
  clearTimeout(timer)
  timer = setTimeout(() => cb(...args), duration)
}

const tabIndices = {
  reporting: 0,
  search: 1
}

class PaginatedTable extends PureComponent {
  state = {}
  constructor(props) {
    super(props)
    this.rows = this.props.protocols.length
    this.state.slice = [0, 5]
  }

  getFilteredData = searchValue => {
    const filteredData = this.props.protocols.filter(p => {
      const term = searchValue.toUpperCase().trim()
      if (term === '') return true
      else {
        for (const key in p) {
          const value = p[key]
            .toString()
            .toUpperCase()
            .trim()
          if (value.indexOf(term) >= 0) return true
        }
      }
      return false
    })
    return filteredData
  }

  getDataSlice = data => {
    const { slice } = this.state
    return data.slice(slice[0], slice[1])
  }

  handlePagination = (start, rowsPerPage) => {
    this.setState({ slice: [start, start + rowsPerPage] })
  }

  render() {
    const { protocols, selectedRow, updateForm, searchValue } = this.props
    const rowsPerPageLabel = 'Rows'
    return (
      <DataTable baseId="paginated-table" plain>
        <TableHeader>
          <TableRow>
            {Object.keys(protocols[0])
              .filter(col => col !== '__typename' && col !== 'id')
              .map(header => (
                <TableColumn role="button" key={`header-col-${header}`} style={{ textAlign: 'center' }}>
                  {header}
                </TableColumn>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.getDataSlice(this.getFilteredData(searchValue)).map((row, i) => (
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
                    {row[col].toString().truncate(20)}
                  </TableColumn>
                ))}
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          defaultRowsPerPage={5}
          rowsPerPageItems={[5, 10, 25, 50]}
          rows={this.getFilteredData(searchValue).length}
          simplifiedMenu={true}
          rowsPerPageLabel={rowsPerPageLabel}
          onPagination={this.handlePagination}
        />
      </DataTable>
    )
  }
}

export default ({ tab }) => (
  <DataQuery query={PROTOCOLS_MIN}>
    {({ protocols }) => (
      <Form searchValue="" hoveredRow={null} selectedRow={null} activeTabIndex={tabIndices[tab] || 0}>
        {({ updateForm, hoveredRow, selectedRow, activeTabIndex, searchValue }) => (
          <>
            <TabsContainer
              activeTabIndex={activeTabIndex}
              onTabChange={activeTabIndex => updateForm({ activeTabIndex })}
              colored
              toolbar={
                <Toolbar style={{ backgroundColor: '#1976D2' }} className={'md-grid'} zDepth={0} prominent>
                  <Cell size={12} style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '20px', lineHeight: '28px' }}>{selectedRow ? selectedRow.title : hoveredRow ? hoveredRow.title : '...'}</p>
                    <p style={{ fontSize: '15px' }}>{selectedRow ? selectedRow.author : hoveredRow ? hoveredRow.author : ''}</p>
                    <p style={{ fontSize: '15px' }}>{selectedRow ? selectedRow.domain : hoveredRow ? hoveredRow.domain : ''}</p>
                  </Cell>
                </Toolbar>
              }
            >
              <Tabs tabId="data-explorer-tabs" style={{ backgroundColor: '#2196F3' }}>
                <Tab label="Reporting">
                  <Grid>
                    <Cell style={{ margin: '30px auto' }} phoneSize={6} tabletSize={6} size={5}>
                      <Card>
                        <CardText>Charts related to the selected row will go here</CardText>
                      </Card>
                    </Cell>
                  </Grid>
                </Tab>
                <Tab label="Search">
                  <Grid>
                    <Cell style={{ margin: '30px auto' }} phoneSize={6} tabletSize={6} size={5}>
                      <Card>
                        <CardText>
                          <TextField
                            value={searchValue}
                            onChange={val => updateForm({ searchValue: val })}
                            id="table-search"
                            label="Search table"
                            lineDirection="center"
                            placeholder="Search by table fields..."
                          />
                        </CardText>
                      </Card>
                    </Cell>
                  </Grid>
                </Tab>
              </Tabs>
            </TabsContainer>
            <PaginatedTable searchValue={searchValue} protocols={protocols} selectedRow={selectedRow} updateForm={updateForm} />

            <Grid>
              <Cell size={12}>
                <Divider />
              </Cell>
            </Grid>

            {selectedRow ? (
              <DataQuery query={PROTOCOL} variables={{ id: selectedRow.id }}>
                {({ protocol }) => (
                  <Grid>
                    <Cell size={12}>
                      <ExpansionList>
                        <ExpansionPanel label="Overview" defaultExpanded footer={false}>
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
                            <b>Published</b>
                          </p>
                          <p>{protocol.publish_year}</p>

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
