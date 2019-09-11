import React from 'react'
import { Grid, Cell } from 'react-md'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOL } from '../../graphql/queries'

export default ({ id }) => (
  <DataQuery query={PROTOCOL} variables={{ id: parseInt(id) }}>
    {({ protocol }) => (
      <Form>
        {({ updateForm }) => (
          <Grid>
            <Cell phoneSize={6} tabletSize={8} size={12}>
              {JSON.stringify(protocol, null, 2)}
            </Cell>
          </Grid>
        )}
      </Form>
    )}
  </DataQuery>
)
