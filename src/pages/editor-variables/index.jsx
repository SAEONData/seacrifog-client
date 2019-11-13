import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { VARIABLE } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { fieldDefinitions } from './variable-definitions'
//VARIABLES EDITOR

//errorFields are never used. All of these(except for typename) hold Object arrays which cause an error on useMutation().
//Look into what the best way to handle these is. Currently these fields are ignored in useMutation
// const errorFields = [
//   'INDIRECTLY_RELATED_PROTOCOLS',
//   'DIRECTLY_RELATED_PROTOCOLS',
//   'RFORCINGS',
//   'DATAPRODUCTS',
//   '__TYPENAME'
// ]

export default ({ id }) => (
  <DataQuery query={VARIABLE} variables={{ id: parseInt(id) }}>
    {(
      { variable } //entityProp was added to data-query. It should maybe be revisited to be more clean
    ) => (
      <Form {...variable}>
        {({ updateForm, ...fields }) => (
          <EntityEditor
            mutation={UPDATE_VARIABLES}
            fieldDefinitions={fieldDefinitions}
            entityProp={variable}
            updateForm={updateForm}
            {...fields}
          />
        )}
      </Form>
    )}
  </DataQuery>
)
