import React from 'react'
import { Grid, Cell } from 'react-md'

export default ({ object }) => (
  <Grid>
    <Cell phoneSize={6} tabletSize={8} size={12}>
      {Object.keys(object).map(key => (
        <p key={key}>
          <b>{key}</b> {object[key]}
        </p>
      ))}
    </Cell>
  </Grid>
)
