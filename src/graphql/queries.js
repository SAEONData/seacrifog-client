import gql from 'graphql-tag'

export const VARIABLES = gql`
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
