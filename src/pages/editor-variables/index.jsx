import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { VARIABLE } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
import { fieldDefinitions } from './variableDefinitions'
//VARIABLES EDITOR

//The fields to be displayed but as disabled(greyed out)
const noneditableFields = ['ID', 'UPDATED_BY', 'UPDATED_AT']
//The fields NOT to be displayed at all
const hiddenFields = [
  'INDIRECTLY_RELATED_PROTOCOLS',
  'DIRECTLY_RELATED_PROTOCOLS',
  'RFORCINGS',
  'DATAPRODUCTS',
  '__TYPENAME'
]

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
