import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { VARIABLE } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
import { fieldDefinitions } from './variableDefinitions'
//VARIABLES EDITOR

export default ({ id }) => (
  <EntityEditor id={id} query={VARIABLE} mutation={UPDATE_VARIABLES} fieldDefinitions={fieldDefinitions} />
)
