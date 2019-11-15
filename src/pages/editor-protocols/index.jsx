import React from 'react'
import { PROTOCOL } from '../../graphql/queries'
import { UPDATE_PROTOCOLS } from '../../graphql/mutations'
import { fieldDefinitions } from './protocol-definitions'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { Grid, Cell, Card } from 'react-md'
import Form from '../../modules/form'
import EntityEditor from '../../modules/shared-components/entity-editor'

//EDITOR PROTOCOLS

export default ({ id }) => (
  <DataQuery query={PROTOCOL} variables={{ id: parseInt(id) }}>
    {(
      { protocol } //entityProp was added to data-query. It should maybe be revisited to be more clean
    ) => (
      <Form {...protocol}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_PROTOCOLS}>
            {({ executeMutation }) => (
              <Grid>
                <Cell phoneSize={4} tabletSize={8} size={12}>
                  <Card>
                    <Grid>
                      <Cell phoneSize={4} tabletSize={8} size={6}>
                        <EntityEditor
                          executeMutation={executeMutation}
                          fieldDefinitions={fieldDefinitions}
                          entityProp={protocol}
                          updateForm={updateForm}
                          {...fields}
                        />
                      </Cell>
                      <Cell>Relationship editor</Cell>
                    </Grid>
                  </Card>
                </Cell>
              </Grid>
            )}
          </DataMutation>
        )}
      </Form>
    )}
  </DataQuery>
)
