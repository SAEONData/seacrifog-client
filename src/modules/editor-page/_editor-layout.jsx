import React from 'react'
import { Grid, Cell, LinearProgress } from 'react-md'

const getProgresStyle = loading => ({
  margin: 0,
  visibility: loading ? 'inherit' : 'hidden'
})

export default ({ children, loading }) => (
  <Grid noSpacing>
    <LinearProgress id={'entity-save-progress-indicator'} style={getProgresStyle(loading)} />
    <Cell size={12}>{children}</Cell>
  </Grid>
)
