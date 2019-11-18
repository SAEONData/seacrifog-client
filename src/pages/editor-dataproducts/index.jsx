import React from 'react'
import EntityEditor from '../../modules/shared-components/entity-editor'
import { DATAPRODUCT } from '../../graphql/queries'
import { UPDATE_DATAPRODUCTS } from '../../graphql/mutations'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import Form from '../../modules/form'
import { Grid, Cell, Card, TextField } from 'react-md'
import { fieldDefinitions } from './dataproduct-definitions'
import SaveButton from '../../modules/shared-components/save-button'
//DATAPRODUCTS EDITOR

export default ({ id }) => (
  <DataQuery query={DATAPRODUCT} variables={{ id: parseInt(id) }}>
    {({ dataproduct }) => (
      <Form {...dataproduct}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_DATAPRODUCTS}>
            {({ executeMutation }) => (
              <Grid>
                <Cell phoneSize={4} tabletSize={8} size={12}>
                  <Card>
                    <SaveButton
                      fields={fields}
                      fieldDefinitions={fieldDefinitions}
                      containerStyle={{ display: 'inline-block', width: '100%' }}
                      buttonStyle={{ marginTop: '15px', marginRight: '15px', marginBottom: '15px', float: 'right' }}
                      progressStyle={{ float: 'right' }}
                      onClick={() => {
                        const editedFields = Object.entries(fields).filter(field => {
                          return fieldDefinitions[field[0]].display && fieldDefinitions[field[0]].editable
                        })
                        //Converting any Fields that GraphQL sees as Floats or Integers to JS Numbers since they are currently strings.
                        for (var field of editedFields) {
                          if (fieldDefinitions[field[0]].type === Number) {
                            field[1] = parseFloat(field[1])
                          }
                          if (fieldDefinitions[field[0]].type === Date) {
                            //Date.parse can give weird results. Avoiding any unexpected issues
                            // var dateArr
                            // if (field[1].includes('/')) dateArr = field[1].split('/')
                            // else if (field[1].includes('-')) dateArr = field[1].split('-')
                            // const date = new Date(field[1])
                          }
                        }

                        executeMutation({
                          variables: {
                            input: [
                              {
                                id: fields.id,
                                ...Object.fromEntries(editedFields)
                              }
                            ]
                          }
                        })
                      }}
                    />

                    <Grid>
                      <Cell phoneSize={4} tabletSize={8} size={6} id="entity-editor-cell">
                        <h1>Properties</h1>
                        <EntityEditor
                          executeMutation={executeMutation}
                          fieldDefinitions={fieldDefinitions}
                          entityProp={dataproduct}
                          updateForm={updateForm}
                          {...fields}
                        />
                      </Cell>
                      <Cell phoneSize={4} tabletSize={8} size={6} id="relationship-editor-cell">
                        <h1>Relationships</h1>
                        <TextField id="textfield-variables" label="Variables" />
                        <TextField id="textfield-protocols" label="Protocols" />
                        <TextField id="textfield-dataproducts" label="Dataproducts" />
                      </Cell>
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
