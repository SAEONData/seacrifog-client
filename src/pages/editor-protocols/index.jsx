import React from 'react'
import { PROTOCOL } from '../../graphql/queries'
import { UPDATE_PROTOCOLS } from '../../graphql/mutations'
import { fieldDefinitions } from './protocol-definitions'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import EntityEditor from '../../modules/shared-components/entity-editor'

//EDITOR PROTOCOLS

export default ({ id }) => (
  <DataQuery query={PROTOCOL} variables={{ id: parseInt(id) }}>
    {(
      { entityProp, protocol } //entityProp was added to data-query. It should maybe be revisited to be more clean
    ) => (
      <Form {...protocol}>
        {({ updateForm, ...fields }) => (
          <EntityEditor
            mutation={UPDATE_PROTOCOLS}
            fieldDefinitions={fieldDefinitions}
            entityProp={protocol}
            updateForm={updateForm}
            {...fields}
          />
        )}
      </Form>
    )}
  </DataQuery>
)
