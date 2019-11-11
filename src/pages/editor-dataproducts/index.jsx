import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { DATAPRODUCT } from '../../graphql/queries'
import { UPDATE_DATAPRODUCTS } from '../../graphql/mutations'
import { fieldDefinitions } from './dataproductDefinitions'
//DATAPRODUCTS EDITOR

export default ({ id }) => (
  <EntityEditor
    id={id}
    query={DATAPRODUCT}
    mutation={UPDATE_DATAPRODUCTS}
    fieldDefinitions={fieldDefinitions}
  ></EntityEditor>
)
