import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, CardTitle, CardText, Grid, Cell } from 'react-md'

const QUERY = gql`
  query hello {
    hello
  }
`

export default () => (
  <Query query={QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading...</p>
      if (error) return <p>ERROR</p>
      return (
        <Grid>
          <Cell size={12}>
            <Card>
              <CardTitle title="This is a title" subtitle="And subtitle" />
              <CardText>
                <p>{JSON.stringify(data)}</p>
              </CardText>
            </Card>
          </Cell>
        </Grid>
      )
    }}
  </Query>
)
