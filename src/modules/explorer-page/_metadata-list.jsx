import React from 'react'
import { Grid, Cell } from 'react-md'

export default ({ searchResults }) => (
  <Grid>
    <Cell size={12}>
      {searchResults.map((rcrd, i) => (
        <p key={i}>{JSON.stringify(rcrd)}</p>
      ))}
    </Cell>
  </Grid>
)
