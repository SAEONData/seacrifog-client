import React from 'react'
import { GlobalStateContext } from '../../global-state'
import DataQuery from '../../modules/data-query'
import { PROTOCOLS_MIN } from '../../graphql/queries'
import { Grid, Cell } from 'react-md'

export default props => (
  <GlobalStateContext.Consumer>
    {({ selectedProtocols, updateSelectedProtocols }) => (
      <DataQuery query={PROTOCOLS_MIN}>
        {({ protocols }) => (
          <Grid>
            <Cell tabletSize={4} size={4}>
              new table goes here
            </Cell>
            <Cell tabletSize={4} size={8}>
              ?
            </Cell>
          </Grid>
        )}
      </DataQuery>
    )}
  </GlobalStateContext.Consumer>
)
