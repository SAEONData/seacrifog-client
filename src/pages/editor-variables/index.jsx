import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { VARIABLE } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
import { fieldDefinitions } from './variableDefinitions'
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
  <EntityEditor id={id} query={VARIABLE} mutation={UPDATE_VARIABLES} fieldDefinitions={fieldDefinitions} />
)
