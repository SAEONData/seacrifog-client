import React from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import Form from '../../modules/form'
import { Grid, Cell, Card, CardTitle, CardText } from 'react-md'

export default () => (
  <Form>
    {({ updateForm }) => (
      <DataQuery query={ENTIRE_GRAPH}>
        {({ variables, protocols, protocolsXrefVariables }) => (
          <Grid>
            <Cell size={12}>
              <Card>
                <CardTitle title="search" />
                <CardText></CardText>
              </Card>
            </Cell>
          </Grid>
        )}
      </DataQuery>
    )}
  </Form>
)
