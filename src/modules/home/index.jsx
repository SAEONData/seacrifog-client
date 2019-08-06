import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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
      return <div>{JSON.stringify(data)}</div>
    }}
  </Query>
)