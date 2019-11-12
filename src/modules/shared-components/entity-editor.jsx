import React from 'react'
import { Grid, Cell, Card, CardText, TextField, Button } from 'react-md'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import Form from '../../modules/form'

//TO-DO:
//->Move DataQuery from entity-editor to editor-variables, editor-protocol, editor-dataproducts so that DataQuery can have 2 children trees(entity editor and relationship editor)
//Relationship Editor will be very explicit unlike entity-editor so its best have them as separate components.
//->if a column is added to the DB, an error will be thrown by the filters. This is because the entry is not found in our explicit fieldDefinitions.
//create a popup alert / admin alert system to notify a dev to add the definition to fieldDefinitions and ignore that field for the sake of the user
export default ({ id, query, mutation, fieldDefinitions }) => (
  <>
    <DataQuery query={query} variables={{ id: parseInt(id) }}>
      {(
        { entityProp } //entityProp was added to data-query. It should maybe be revisited to be more clean
      ) => (
        <Form {...entityProp}>
          {({ updateForm, ...fields }) => (
            <DataMutation mutation={mutation}>
              {({ executeMutation }) => (
                <Grid>
                  <Cell phoneSize={4} tabletSize={8} size={12}>
                    <Card>
                      <Grid>
                        <Cell phoneSize={4} tabletSize={8} size={6}>
                          <CardText>
                            {Object.entries(fields)
                              .filter(([field]) => {
                                return fieldDefinitions[field].display
                              }) //removing any unwanted columns
                              .map(([key, value], i) => (
                                <TextField
                                  id={'update-form-entity' + i}
                                  key={i}
                                  label={fieldDefinitions[key].label}
                                  rows={1}
                                  disabled={!fieldDefinitions[key].editable}
                                  value={value != null ? value.toString() : ''} //NOTE: This can cause null values to be saved as "null" if editor is opened and saved
                                  onChange={val => updateForm({ [key]: val })}
                                />
                              ))}

                            <Button
                              onClick={() => {
                                const editableFields = Object.entries(fields).filter(field => {
                                  return fieldDefinitions[field[0]].display && fieldDefinitions[field[0]].editable
                                })
                                console.log(editableFields)
                                executeMutation({
                                  variables: {
                                    input: [
                                      {
                                        id: fields.id,
                                        ...Object.fromEntries(editableFields)
                                      }
                                    ]
                                  }
                                })
                              }}
                              style={{ marginTop: '20px' }}
                              swapTheming
                              primary
                              flat
                            >
                              save
                            </Button>
                          </CardText>
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
  </>
)
