import React from 'react'
import { Query } from 'react-apollo'

export default ({ query, children }) => (
  <Query query={query}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading page data...</p>
      if (error) return <p>ERROR retrieving data from GraphQL API</p>
      return children(data)
    }}
  </Query>
)
