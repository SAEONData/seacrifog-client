import React from 'react'
import { Grid, Cell } from 'react-md'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { DATAPRODUCT } from '../../graphql/queries'

export default ({ id }) => (
  <DataQuery query={DATAPRODUCT} variables={{ id: parseInt(id) }}>
    {({ dataproduct }) => (
      <Form>
        {({ updateForm }) => (
          <Grid>
            <Cell phoneSize={6} tabletSize={8} size={12}>
              {JSON.stringify(dataproduct, null, 2)}
            </Cell>
          </Grid>
        )}
      </Form>
    )}
  </DataQuery>
)
