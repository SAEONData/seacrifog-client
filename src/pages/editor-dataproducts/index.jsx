import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { DATAPRODUCT } from '../../graphql/queries'
import { UPDATE_DATAPRODUCTS } from '../../graphql/mutations'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { fieldDefinitions } from './dataproduct-definitions'
//DATAPRODUCTS EDITOR

export default ({ id }) => (
  <DataQuery query={DATAPRODUCT} variables={{ id: parseInt(id) }}>
    {({ dataproduct }) => (
      <Form {...dataproduct}>
        {({ updateForm, ...fields }) => (
          <EntityEditor
            mutation={UPDATE_DATAPRODUCTS}
            fieldDefinitions={fieldDefinitions}
            entityProp={dataproduct}
            updateForm={updateForm}
            {...fields}
          />
        )}
      </Form>
    )}
  </DataQuery>
)
