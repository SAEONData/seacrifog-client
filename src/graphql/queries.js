import gql from 'graphql-tag'

export const VARIABLE = gql`
  query variable($id: Int!) {
    variable(id: $id) {
      id
      name
      domain
      class
    }
  }
`

export const PROTOCOL = gql`
  query protocol($id: Int!) {
    protocol(id: $id) {
      id
      doi
      author
      publisher
      title
      publish_date
      publish_year
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
      created_by
      created_at
      edited_by
      updated_at
      indirectly_related_variables {
        id
        name
        class
        domain
      }
      directly_related_variables {
        id
        name
        class
        domain
      }
    }
  }
`

export const PROTOCOLS_MIN = gql`
  query protocols {
    protocols {
      id
      author
      title
      publish_year
      domain
    }
  }
`

export const VARIABLES = gql`
  query variables {
    variables {
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
      updated_by
      updated_at
      frequency_value
      frequency_unit
      frequency_comment
      res_value
      res_unit
      res_comment
      run_cval
      run_cunit
      run_ccomment
      req_source
      req_uri
      technology_type
      protocols {
        id
        doi
        author
        publisher
        title
        publish_date
        publish_year
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
        created_by
        created_at
        edited_by
        updated_at
      }
    }
  }
`
