import React from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import Atlas from './atlas'

export default () => (
  <DataQuery query={ENTIRE_GRAPH} variables={{}}>
    {data => <Atlas data={data} />}
  </DataQuery>
)
