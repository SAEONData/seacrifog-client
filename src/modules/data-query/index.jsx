import React from 'react'
import { useQuery } from '@apollo/react-hooks'

export default ({ query, variables, children }) => {
  const { loading, error, data } = useQuery(query, { variables })
  if (loading) return <p>Loading page data...</p>
  if (error) return <p>ERROR retrieving data from GraphQL API</p>
  return children(data)
}
