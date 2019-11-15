import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { Grid, Cell, Card } from 'react-md'
import { VARIABLE } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import Form from '../../modules/form'
import { fieldDefinitions } from './variable-definitions'
//VARIABLES EDITOR

export default ({ id }) => (
  <DataQuery query={VARIABLE} variables={{ id: parseInt(id) }}>
    {(
      { variable } //entityProp was added to data-query. It should maybe be revisited to be more clean
    ) => (
      <Form {...variable}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_VARIABLES}>
            {({ executeMutation }) => (
              <Grid>
                <Cell phoneSize={4} tabletSize={8} size={12}>
                  <Card>
                    <Grid>
                      <Cell phoneSize={4} tabletSize={8} size={6}>
                        <EntityEditor
                          executeMutation={executeMutation}
                          fieldDefinitions={fieldDefinitions}
                          entityProp={variable}
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
