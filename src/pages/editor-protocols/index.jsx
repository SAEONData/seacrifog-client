import React from 'react'
import { PROTOCOL } from '../../graphql/queries'
import { UPDATE_PROTOCOLS } from '../../graphql/mutations'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { fieldDefinitions } from './protocolDefinitions'
//EDITOR PROTOCOLS

export default ({ id }) => (
  <EntityEditor id={id} query={PROTOCOL} mutation={UPDATE_PROTOCOLS} fieldDefinitions={fieldDefinitions} />
)
