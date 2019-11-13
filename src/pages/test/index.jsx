import React from 'react'
import DataQuery from '../../modules/data-query'
import { PROTOCOLS_MIN } from '../../graphql/queries'
import { Grid, Cell } from 'react-md'
// import { DatabaseIcon, PencilIcon } from '../../svg-icons'

export default () => (
  <DataQuery query={PROTOCOLS_MIN} variables={{}}>
    {({ protocols }) => {
      console.log(protocols)
      return (
        <Grid>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
        </Grid>
      )
    }}
  </DataQuery>
)
