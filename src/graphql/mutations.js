import gql from 'graphql-tag'

export const UPDATE_PROTOCOLS = gql`
  mutation updateProtocols($input: [ProtocolInput!]!) {
    updateProtocols(input: $input) {
      id
      author
      domain
    }
  }
`
