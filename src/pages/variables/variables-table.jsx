import React from 'react'
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md'

// eslint-disable-next-line no-extend-native
String.prototype.truncate = function(length, ending) {
  length = length || 100
  ending = ending || '...'
  if (this.length > length) return this.substring(0, length - ending.length) + ending
  else return this
}

export default ({ data, updateForm, selectedVariableRow }) => (
  <DataTable plain>
    <TableHeader>
      <TableRow>
        <TableColumn>Domain</TableColumn>
        <TableColumn>Class</TableColumn>
        <TableColumn>Name</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(d => (
        <TableRow style={{ cursor: 'pointer' }} key={`table-row-variables-${d.id}`} onClick={e => updateForm({ selectedVariableRow: d.id })}>
          <TableColumn>{d.domain}</TableColumn>
          <TableColumn>{d.class}</TableColumn>
          <TableColumn>{d.name.truncate(40)}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>
)
