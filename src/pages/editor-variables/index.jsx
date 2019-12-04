import React from 'react'
import { Grid, Cell, Card, CardText, CardTitle } from 'react-md'
import Form from '../../modules/form'
import EntityEditor from '../../modules/shared-components/entity-editor'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { fieldDefinitions } from './variable-definitions'
import { EditorSaveButton, EditorLayout } from '../../modules/shared-components/editor-pages'
import { VARIABLE, DATAPRODUCTS_MIN } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
import { DropdownSelect } from '../../modules/shared-components/dropdown-select'
//VARIABLES EDITOR
//Relations:
//indirectly_related_protocols
//directly_related_protocols
//dataproducts
//rforcings

//TO DO:
/*
-->updateVariables(input:{id:1, addDataproducts:[80]}) throws error in graphiql. addDataproducts probably has a bug.
-->client page can remove a variable relation but not add one since variable seems to be matching to fields whenever fields gets a new property but not a dataproduct is deleted from fields. Maybe a updateForm issue. 
*/
export default ({ id }) => {
  return (
    <DataQuery query={VARIABLE} variables={{ id: parseInt(id) }}>
      {({ variable }) => (
        <Form {...variable}>
          {({ updateForm, ...fields }) => (
            <DataMutation mutation={UPDATE_VARIABLES}>
              {({ executeMutation, mutationLoading, mutationError }) => (
                <DataQuery query={DATAPRODUCTS_MIN}>
                  {({ dataproducts }) => (
                    <EditorLayout loading={mutationLoading}>
                      <Grid>
                        {/* Save button */}
                        <Cell size={12}>
                          <EditorSaveButton
                            saveEntity={() => {
                              //variable IDs and fields IDs as int arrays
                              const variableDataproducts =
                                Object.entries(variable.dataproducts).map(item => item[1].id) || []
                              const fieldsDataproducts =
                                Object.entries(fields.dataproducts).map(item => item[1].id) || []

                              console.log('varData', variable.dataproducts)
                              console.log('fieldsData', fields.dataproducts)

                              fields.addDataproducts = fieldsDataproducts.filter(id =>
                                variableDataproducts.includes(id) ? false : true
                              )
                              fields.removeDataproducts = variableDataproducts.filter(id =>
                                fieldsDataproducts.includes(id) ? false : true
                              )
                              if (fields.addDataproducts === undefined) fields.addDataproducts = []
                              if (fields.removeDataproducts === undefined) fields.removeDataproducts = []

                              if (fields.addDataproducts.length > 0) fieldDefinitions.addDataproducts.pristine = false
                              if (fields.removeDataproducts.length > 0)
                                fieldDefinitions.removeDataproducts.pristine = false

                              console.log('fields.dataproducts', fields.dataproducts)
                              console.log('add', fields.addDataproducts)
                              console.log('remove', fields.removeDataproducts)
                              // fields['addDataproducts'] = [1, 2, 3, 4, 5, 6]
                              // fields['removeDataproducts'] = [3, 4]
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
                            }}
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
                                entityProp={variable}
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
                            <Grid>
                              <DropdownSelect
                                label="Dataproducts"
                                id="Dataproduct-relations"
                                //The full list of selectable items taken as an array of keyValuePairs [{k1,v1}, {k2,v2}, {k3:v3}]
                                //value must be a string(for now)
                                items={dataproducts.map(item => ({
                                  id: item.id,
                                  value: item.id.toString() + ' - ' + item.title
                                }))}
                                //The list of already selected items from items taken as an array of integers(id/key of item)
                                selectedItems={Object.entries(fields.dataproducts).map(item => item[1].id) || []}
                                onItemToggle={id => {
                                  var updatedFields = fields
                                  //IF dataproduct isn in fields.dataproducts:
                                  if (
                                    Object.entries(fields.dataproducts)
                                      .map(item => item[1].id)
                                      .includes(id)
                                  ) {
                                    //TOGGLE DESELECT:
                                    for (var i = 0; i < fields.dataproducts.length; i++) {
                                      if (fields.dataproducts[i].id === id) {
                                        updatedFields.dataproducts = fields.dataproducts.filter(dp => dp.id !== id)
                                      }
                                    }
                                  } else {
                                    //TOGGLE SELECT:
                                    updatedFields.dataproducts.push({ id: id })
                                  }
                                  updateForm({ dataproducts: updatedFields.dataproducts })
                                }}
                              />
                            </Grid>
                          </Card>
                        </Cell>
                      </Grid>
                    </EditorLayout>
                  )}
                </DataQuery>
              )}
            </DataMutation>
          )}
        </Form>
      )}
    </DataQuery>
  )
}
