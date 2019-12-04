import React from 'react'
import { Grid, Cell, Card, TextField, CardText, CardTitle } from 'react-md'
import Form from '../../modules/form'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { fieldDefinitions } from './dataproduct-definitions'
import { EditorSaveButton, EditorLayout, EntityEditor } from '../../modules/shared-components'
import { DATAPRODUCT } from '../../graphql/queries'
import { UPDATE_DATAPRODUCTS } from '../../graphql/mutations'
//DATAPRODUCTS EDITOR

export default ({ id }) => (
  <DataQuery query={DATAPRODUCT} variables={{ id: parseInt(id) }}>
    {({ dataproduct }) => (
      <Form {...dataproduct}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_DATAPRODUCTS}>
            {({ executeMutation, mutationLoading, mutationError }) => (
              <EditorLayout loading={mutationLoading}>
                <Grid>
                  {/* Save button */}
                  <Cell size={12}>
                    <EditorSaveButton
                      saveEntity={() =>
                        executeMutation({
                          variables: {
                            input: [
                              {
                                id: fields.id,
                                ...Object.fromEntries(
                                  Object.entries(fields).filter(([key]) =>
                                    fieldDefinitions[key] ? !fieldDefinitions[key].pristine : false
                                  )
                                )
                              }
                            ]
                          }
                        })
                      }
                    />
                  </Cell>

                  {/* Properties */}
                  <Cell phoneSize={4} tabletSize={8} size={6}>
                    <Card>
                      <CardTitle title={'Properties'} subtitle={'Edit fields below'} />
                      <CardText>
                        <EntityEditor
                          executeMutation={executeMutation}
                          fieldDefinitions={fieldDefinitions}
                          entityProp={dataproduct}
                          updateForm={updateForm}
                          {...fields}
                        />
                      </CardText>
                    </Card>
                  </Cell>

                  {/* Relationships */}
                  <Cell phoneSize={4} tabletSize={8} size={6}>
                    <Card>
                      <CardTitle title={'Relationships'} subtitle={'Edit associations with other entities'} />
                      <CardText>
                        <TextField id="textfield-variables" label="Variables" />
                        <TextField id="textfield-protocols" label="Protocols" />
                        <TextField id="textfield-dataproducts" label="Dataproducts" />
                      </CardText>
                    </Card>
                  </Cell>
                </Grid>
              </EditorLayout>
            )}
          </DataMutation>
        )}
      </Form>
    )}
  </DataQuery>
)
