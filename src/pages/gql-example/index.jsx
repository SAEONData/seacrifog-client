import React from 'react'
import QueryRenderer from '../../modules/query-renderer'
import { Card, CardTitle, CardText, Grid, Cell } from 'react-md'
import { VARIABLES } from '../../graphql/queries'

export default () => (
  <QueryRenderer query={VARIABLES}>
    {data => (
      <Grid>
        <Cell size={12}>
          <Card>
            <CardTitle title="This is a title" subtitle="And subtitle" />
            <CardText>
              <p>{JSON.stringify(data)}</p>
              <p>Edit me in /src/modules/gql-example/index.jsx</p>
            </CardText>
          </Card>
        </Cell>
      </Grid>
    )}
  </QueryRenderer>
)
