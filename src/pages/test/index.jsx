import React from 'react'
import { Grid, Cell } from 'react-md'
import DataQuery from '../../modules/data-query'
import { VARIABLE } from '../../graphql/queries'

export default () => (
  <DataQuery query={VARIABLE} variables={{ id: 4 }}>
    {data => <div>{JSON.stringify(data)}</div>}
  </DataQuery>
)
