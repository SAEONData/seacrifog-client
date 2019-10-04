import React, { PureComponent } from 'react'
import debounce from '../../lib/debounce'
import { mergeLeft } from 'ramda'
import { log } from '../../lib/log'
import {
  Toolbar,
  TextField,
  FontIcon,
  DataTable,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  TablePagination,
  Button
} from 'react-md'

export default class extends PureComponent {
  headers = {}

  constructor(props) {
    super(props)
    this.rows = this.props.data.length
    this.invisibleHeaders = this.props.invisibleHeaders || []

    // Setup state
    const state = {
      searchValue: this.props.initialSearch ? this.props.initialSearch : '',
      slice: [0, 5],
      sorting: {}
    }

    // Setup headers for keeping header-column values aligned
    // Also, setup sorting
    this.props.headers.forEach((h, i) => {
      this.headers[h] = i
      state.sorting[h] = {
        sorted: false,
        ascending: true
      }
    })

    state.filteredData = this.getFilteredData(state.searchValue)

    this.state = state
  }

  getFilteredData = searchValue => {
    // First get filtered data
    const filteredData = this.props.data.filter(p => {
      const term = searchValue.toUpperCase().trim()
      if (term === '') return true
      else {
        for (const key in p) {
          const value = (p[key] || '')
            .toString()
            .toUpperCase()
            .trim()
          if (value.indexOf(term) >= 0) return true
        }
      }
      return false
    })

    // Then apply sorting
    const { sorting } = this.state || {}
    let sortedCol
    for (let col in sorting) {
      if (sorting[col].sorted) sortedCol = col
    }

    const asending = sortedCol ? (sorting[sortedCol].ascending ? -1 : 1) : 0

    // Then return
    return sortedCol
      ? filteredData.sort((a, b) => {
          const aSortVal = typeof a[sortedCol] === 'string' ? a[sortedCol].toUpperCase() : parseFloat(a[sortedCol] || 0)
          const bSortVal = typeof b[sortedCol] === 'string' ? b[sortedCol].toUpperCase() : parseFloat(b[sortedCol] || 0)
          return aSortVal > bSortVal ? asending : aSortVal < bSortVal ? -asending : 1
        })
      : filteredData
  }

  setFilteredData = () => {
    const filteredData = this.getFilteredData(this.state.searchValue)
    this.setState({ filteredData })
  }

  getDataSlice = data => {
    const { slice } = this.state
    return data.slice(slice[0], slice[1])
  }

  handlePagination = (start, rowsPerPage) => {
    this.setState({ slice: [start, start + rowsPerPage] })
  }

  applySorting = colName => {
    const sorting = Object.assign({}, this.state.sorting)
    Object.keys(sorting).forEach(key => {
      if (key !== colName) sorting[key].sorted = false
      else {
        sorting[key].ascending = !sorting[key].ascending
        sorting[key].sorted = true
      }
    })
    this.setState({ sorting }, () => this.setFilteredData())
  }

  render() {
    const { searchValue, sorting, filteredData } = this.state
    const { selectedRow, toolbarButtons, toolbarStyle } = this.props
    const { headers, invisibleHeaders: specialHeaders, applySorting } = this
    const resetForm = this.props.resetForm || null
    const onRowHover = this.props.onRowHover || (() => log('Row hover changed'))
    const onRowClick = this.props.onRowClick || (() => log('Row selection changed'))

    return (
      <>
        <Toolbar style={mergeLeft(toolbarStyle, { display: 'flex', alignItems: 'center' })} themed zDepth={0}>
          <TextField
            id="table-search"
            style={{ marginLeft: '20px', display: 'flex' }}
            block={true}
            autoComplete={'off'}
            value={searchValue}
            onChange={val => this.setState({ searchValue: val }, () => this.setFilteredData())}
            placeholder="Search by table fields..."
            leftIcon={<FontIcon>search</FontIcon>}
          />
          {(toolbarButtons || []).concat(
            <Button
              key={'reset-form-button'}
              primary
              tooltipPosition={'left'}
              disabled={selectedRow || searchValue ? false : true}
              tooltipLabel={'Reset the form'}
              style={{ display: 'flex', marginRight: '20px' }}
              icon
              onClick={() => {
                this.setState({ searchValue: '' }, () => this.setFilteredData())
                if (resetForm) resetForm()
              }}
            >
              refresh
            </Button>
          )}
        </Toolbar>
        <DataTable responsive={true} baseId="paginated-table" plain>
          <TableHeader>
            <TableRow>
              {Object.keys(headers).map((header, i) => (
                <TableColumn
                  sorted={specialHeaders.includes(header) ? null : sorting[header].ascending}
                  sortIcon={<FontIcon>keyboard_arrow_up</FontIcon>}
                  onClick={() => applySorting(header)}
                  role="button"
                  key={i}
                  style={{ textAlign: 'center' }}
                >
                  {specialHeaders.includes(header) ? '' : header.replace(/_/g, ' ').titleize()}
                </TableColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody onMouseLeave={() => onRowHover(null)}>
            {this.getDataSlice(filteredData).map((row, i) => (
              <TableRow
                className={row.id === (selectedRow || {}).id ? 'selected-row' : ''}
                key={i}
                onMouseOver={debounce(() => onRowHover(row), 5)}
              >
                {(row => {
                  const cols = []
                  Object.keys(row)
                    .filter(col => col !== '__typename' && col !== 'id')
                    .forEach((col, j) => {
                      // Get the header index
                      const index = headers[col]
                      cols[index] = (
                        <TableColumn
                          onClick={() => {
                            if (specialHeaders.includes(col)) return
                            else if (!onRowClick) return
                            else if ((selectedRow || {}).id !== row.id) onRowClick(row)
                            else onRowClick(null)
                          }}
                          plain={false}
                          key={j}
                          style={{ cursor: 'pointer' }}
                        >
                          {row[col] === null || row[col] === undefined
                            ? '-'
                            : row[col].constructor === String
                            ? row[col].toString().truncate(80, '..')
                            : row[col]}
                        </TableColumn>
                      )
                    })
                  return cols
                })(row)}
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            defaultRowsPerPage={5}
            rowsPerPageItems={[5, 10, 25, 50]}
            rows={filteredData.length}
            rowsPerPageLabel={'Rows'}
            onPagination={this.handlePagination}
          />
        </DataTable>
      </>
    )
  }
}
