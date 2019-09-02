import React from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOLS_MIN } from '../../graphql/queries'
import { Grid, Cell } from 'react-md'

export default () => (
  <DataQuery query={PROTOCOLS_MIN}>
    {({ protocols }) => (
      <Form>
        {({ udpdateForm }) => (
          <Grid>
            <Cell phoneSize={6} tabletSize={8} size={12}>
              <p>{JSON.stringify(protocols)}</p>
            </Cell>
          </Grid>
        )}
      </Form>
    )}
  </DataQuery>
)
