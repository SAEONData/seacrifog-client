import React, { PureComponent } from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOLS_MIN, PROTOCOL } from '../../graphql/queries'
import {
  Toolbar,
  TextField,
  DataTable,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  FontIcon,
  TablePagination,
  Grid,
  Cell,
  ExpansionList,
  ExpansionPanel,
  Button
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
        // There is a bug in eslint that makes this necessary ('key' is used)
        // eslint-disable-next-line
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
        <TableBody onMouseLeave={() => updateForm({ hovering: false })} onMouseEnter={() => updateForm({ hovering: true })}>
          {this.getDataSlice(this.getFilteredData(searchValue)).map((row, i) => (
            <TableRow
              className={row.id === (selectedRow || {}).id ? 'selected-row' : ''}
              key={`table-row-${i}`}
              onMouseOver={debounce(() => updateForm({ hoveredRow: row }), 5)}
              onClick={() => {
                if ((selectedRow || {}).id !== row.id) updateForm({ selectedRow: row })
                else updateForm({ selectedRow: null })
              }}
            >
              {Object.keys(row)
                .filter(col => col !== '__typename' && col !== 'id')
                .map((col, j) => (
                  <TableColumn key={`table-col-${i}-${j}`} style={{ cursor: 'pointer' }}>
                    {row[col].toString().truncate(100, '..')}
                  </TableColumn>
                ))}
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          defaultRowsPerPage={5}
          rowsPerPageItems={[5, 10, 25, 50]}
          rows={this.getFilteredData(searchValue).length}
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
      <Form hovering={false} searchValue="" hoveredRow={null} selectedRow={null}>
        {({ updateForm, hoveredRow, selectedRow, searchValue, hovering }) => (
          <>
            <Toolbar className={'md-grid'} zDepth={0} prominent>
              <Cell size={12} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '20px', lineHeight: '28px' }}>
                  {selectedRow ? selectedRow.title : hovering ? (hoveredRow ? hoveredRow.title : '') : '...'}
                </p>
                <p style={{ fontSize: '15px' }}>{selectedRow ? selectedRow.author : hovering ? (hoveredRow ? hoveredRow.author : '') : ''}</p>
                <p style={{ fontSize: '15px' }}>{selectedRow ? selectedRow.domain : hovering ? (hoveredRow ? hoveredRow.domain : '') : ''}</p>
              </Cell>
            </Toolbar>
            <Toolbar style={{ display: 'flex', alignItems: 'center' }} themed zDepth={0}>
              <TextField
                id="table-search"
                style={{ marginLeft: '20px', display: 'flex' }}
                block={true}
                autoComplete={'off'}
                value={searchValue}
                onChange={val => updateForm({ searchValue: val })}
                placeholder="Search by table fields..."
                leftIcon={<FontIcon>search</FontIcon>}
              />
              <Button
                tooltipPosition={'left'}
                disabled={selectedRow ? false : true}
                tooltipLabel={'Go to <insert protocols URL here>'}
                style={{ display: 'flex', marginRight: '20px' }}
                icon
                onClick={() => alert('todo')}
              >
                link
              </Button>
              <Button
                tooltipPosition={'left'}
                disabled={selectedRow ? false : true}
                tooltipLabel={'Download collated information regarding this protocol'}
                style={{ display: 'flex', marginRight: '20px' }}
                icon
                onClick={() => alert('todo')}
              >
                picture_as_pdf
              </Button>
            </Toolbar>

            <PaginatedTable searchValue={searchValue} protocols={protocols} selectedRow={selectedRow} updateForm={updateForm} />

            {selectedRow ? (
              <DataQuery query={PROTOCOL} variables={{ id: selectedRow.id }}>
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
                          <Grid>
                            <Cell phoneSize={6} tabletSize={8} size={6}>
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
                            </Cell>
                            <Cell phoneSize={6} tabletSize={8} size={6}>
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
                            </Cell>
                          </Grid>
                        </ExpansionPanel>
                        <ExpansionPanel label="Related Variables" footer={false}>
                          <Grid>
                            <Cell size={12}>
                              <p>TODO</p>
                            </Cell>
                          </Grid>
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
