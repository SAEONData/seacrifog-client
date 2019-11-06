import gql from 'graphql-tag'

export const UPDATE_PROTOCOLS = gql`
  mutation updateProtocols($input: [ProtocolInput!]!) {
    updateProtocols(input: $input) {
      author
      publisher
      title
      coverage_type
      category
      domain
      purpose
      abstract
      license
      language
      format
      sustainability
      version
      resolution
      cost
      source
    }
  }
`

export const UPDATE_VARIABLES = gql`
  mutation updateVariables($input: [VariableInput!]!) {
    updateVariables(input: $input) {
      id
      name
      class
      domain
      set
      description
      method
      uri
      rftype
      score
      rating
      relevance
      feasibility
      cost
      frequency_value
      frequency_unit
      frequency_comment
      res_value
      res_unit
      res_comment
      unc_val
      unc_unit
      unc_comment
      req_source
      req_uri
      technology_type
    }
  }
`

export const UPDATE_DATAPRODUCTS = gql`
  mutation updateDataproducts($input: [DataproductInput!]!) {
    updateDataproducts(input: $input) {
      id
      title
    }
  }
`
