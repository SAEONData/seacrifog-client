import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Cell } from 'react-md'

export default ({ query, variables, children, loadingComponent = null }) => {
  const { loading, error, data } = useQuery(query, { variables })

  if (loading)
    return loadingComponent ? (
      loadingComponent
    ) : (
      <Grid>
        <Cell style={{ minHeight: '300px' }} phoneSize={6} tabletSize={8} size={12}>
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

  return children(data)
}
