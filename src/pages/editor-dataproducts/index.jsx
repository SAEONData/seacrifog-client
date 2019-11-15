import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { DATAPRODUCT } from '../../graphql/queries'
import { UPDATE_DATAPRODUCTS } from '../../graphql/mutations'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import Form from '../../modules/form'
import { Grid, Cell, Card } from 'react-md'
import { fieldDefinitions } from './dataproduct-definitions'
//DATAPRODUCTS EDITOR

export default ({ id }) => (
  <DataQuery query={DATAPRODUCT} variables={{ id: parseInt(id) }}>
    {(
      { dataproduct } //entityProp was added to data-query. It should maybe be revisited to be more clean
    ) => (
      <Form {...dataproduct}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_DATAPRODUCTS}>
            {({ executeMutation }) => (
              <Grid>
                <Cell phoneSize={4} tabletSize={8} size={12}>
                  <Card>
                    <Grid>
                      <Cell phoneSize={4} tabletSize={8} size={6}>
                        <EntityEditor
                          executeMutation={executeMutation}
                          fieldDefinitions={fieldDefinitions}
                          entityProp={dataproduct}
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
