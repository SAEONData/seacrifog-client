import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Cell } from 'react-md'

export default ({ query, variables, children }) => {
  const { loading, error, data } = useQuery(query, { variables })

  if (loading)
    return (
      <Grid>
        <Cell phoneSize={6} tabletSize={8} size={12}>
          <p>Loading...</p>
        </Cell>
      </Grid>
    )
  if (error)
    return (
      <Grid>
        <Cell phoneSize={6} tabletSize={8} size={12}>
          <p>ERROR fetching data</p>
        </Cell>
      </Grid>
    )

  /*The below is no longer relevant as DataQuery was moved out of EntityEditor and back to protocol/variable/dataproduct-editor */
  //look into a way of giving data default props of protocol, variable, and dataproduct
  //The below is perhaps a poor way of ensuring data has protocol, variable, and dataproduct objects. Look into a better way of handling this issue
  //update to having a 4th parameter being entityProp
  //data.entityProp = {}
  //data.entityProp = 'protocol' in data ? data['protocol'] : 'variable' in data ? data['variable'] : data['dataproduct']
  return children(data)
}
