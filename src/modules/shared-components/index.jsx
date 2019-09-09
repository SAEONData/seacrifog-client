import React from 'react'
import { Grid, Cell } from 'react-md'

export const NoneMessage = () => <p style={{ textAlign: 'center' }}>(None)</p>

export const FormattedInfo = ({ object }) => (
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
