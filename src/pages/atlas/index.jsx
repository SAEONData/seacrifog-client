import React from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import Layout from './modules'

export default () => (
  <DataQuery query={ENTIRE_GRAPH} variables={{}}>
    {data => <Layout data={data} />}
  </DataQuery>
)
