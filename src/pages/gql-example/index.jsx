import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, CardTitle, CardText, Grid, Cell } from 'react-md'

const QUERY = gql`
  query variables {
    variables {
      id
      name
      class
      domain
      protocols {
        id
        doi
        author
        publisher
        title
      }
    }
  }
`

export default () => (
  <Query query={QUERY}>
    {({ data, loading, error }) => (
      <Grid>
        <Cell size={12}>
          <Card>
            <CardTitle title="This is a title" subtitle="And subtitle" />
            <CardText>
              {loading ? (
                <p>LOADING...</p>
              ) : error ? (
                <p>ERROR...</p>
              ) : (
                JSON.stringify(data)
              )}
              <p>Edit me in /src/modules/gql-example/index.jsx</p>
            </CardText>
          </Card>
        </Cell>
      </Grid>
    )}
  </Query>
)
