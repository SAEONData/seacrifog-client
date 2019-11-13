import React, { PureComponent } from 'react'
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Toolbar, TextField, FontIcon } from 'react-md'

const getSortFromInts = (a, b) => (a > b ? 1 : a < b ? -1 : 0)

export default class extends PureComponent {
  rowToIdMap = {}
  render() {
    const { props, state, rowToIdMap } = this
    const { data, dataDefinitions, toggleSelect } = props
    return (
      <>
        <Toolbar style={{ display: 'flex', alignItems: 'center' }} themed zDepth={0}>
          <TextField
            id="table-search"
            style={{ marginLeft: '20px', display: 'flex' }}
            block={true}
            autoComplete={'off'}
            // value={}
            // onChange={val => this.setState({ searchValue: val }, () => this.setFilteredData())}
            placeholder="Search by table fields..."
            leftIcon={<FontIcon>search</FontIcon>}
          />
        </Toolbar>
        <DataTable
          onRowToggle={(rowNum, checked, selectedCount, e) => {
            const id = rowToIdMap[rowNum]
            toggleSelect({ id, selected: checked })
            // const datum = data.find(({ id }) => id === dataId)
          }}
          responsive={true}
          fullWidth
          baseId="selectable-table"
        >
          <TableHeader>
            <TableRow>
              {Object.entries(dataDefinitions)
                .filter(([, { show }]) => show)
                .sort(([, a], [, b]) => {
                  const aOrder = a.order || -9
                  const bOrder = b.order || -8
                  return getSortFromInts(aOrder, bOrder)
                })
                .map(([fieldName, { grow, label }], i) => (
                  <TableColumn key={i} grow={grow}>
                    {label || fieldName}
                  </TableColumn>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .filter(row => true) // Apply text filter
              .map((row, i) => {
                rowToIdMap[i + 1] = row.id // Keep track of which IDs are in whic rows
                return (
                  <TableRow key={i}>
                    {Object.entries(row)
                      .filter(([field]) => dataDefinitions[field] && dataDefinitions[field].show)
                      .sort(([fieldNameA], [fieldNameB]) => {
                        const aOrder = dataDefinitions[fieldNameA].order || -9
                        const bOrder = dataDefinitions[fieldNameB].order || -8
                        return getSortFromInts(aOrder, bOrder)
                      })
                      .map(([field, value], i) => (
                        <TableColumn key={i} plain={true}>
                          {value.truncate ? value.truncate(140) : value}
                        </TableColumn>
                      ))}
                  </TableRow>
                )
              })}
          </TableBody>
        </DataTable>
      </>
    )
  }
}
