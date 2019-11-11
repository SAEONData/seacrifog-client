import React from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import AtlasController from './atlas-controller'

export default props => (
  <DataQuery query={ENTIRE_GRAPH} variables={{}}>
    {data => <AtlasController data={data} {...props} />}
  </DataQuery>
)
