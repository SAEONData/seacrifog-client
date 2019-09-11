import React from 'react'
import { Grid, Cell } from 'react-md'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { VARIABLE } from '../../graphql/queries'

export default ({ id }) => (
  <DataQuery query={VARIABLE} variables={{ id: parseInt(id) }}>
    {({ variable }) => (
      <Form>
        {({ updateForm }) => (
          <Grid>
            <Cell phoneSize={6} tabletSize={8} size={12}>
              {JSON.stringify(variable, null, 2)}
            </Cell>
          </Grid>
        )}
      </Form>
    )}
  </DataQuery>
)
