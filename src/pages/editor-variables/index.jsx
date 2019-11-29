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
// const relations = ['indirectly_related_protocols', 'dataproducts']
// var relatedDataproducts = []
// var unrelatedDataproducts = []
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
                              console.log('dataproducts', dataproducts)
                              console.log('fields.dataproducts', fields.dataproducts)
                              console.log('Object.entries(fields.dataproducts', Object.entries(fields.dataproducts))
                              //console.log(({ id, title: value } = fields.dataproducts[0]))

                              //Create a new DataQuery that pulls ALL dataproducts and use this notation below to
                              //create an array of {id, value} pairs. This will act as the items prop of dropdownSelect
                              var myVal = fields.dataproducts.map(item => ({ id: item.id, value: item.title }))

                              console.log('myVal', myVal)
                              console.log(
                                'Object.entries(fields.dataproducts).map(item => item.id)',
                                Object.entries(fields.dataproducts).map(item => item[1].id)
                              )
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
                              <>
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
                                  selectedItems={Object.entries(fields.dataproducts).map(item => item[1].id)}
                                  // onItemToggle={id => {
                                  //   const selectedDataproducts = Object.entries(fields.dataproducts).map(item => item[1].id)
                                  //   if (selectedDataproducts.includes(id))
                                  //   {
                                  //     for(d of selectedDataproducts)
                                  //     {
                                  //       if(d == id)

                                  //     }
                                  //     unrelatedDataproducts.
                                  //     //delete from fields
                                  //     for(field of fields)
                                  //     if(field.id === id)
                                  //     delete field
                                  //   }
                                  //   else
                                  //   {
                                  //     //add to fields.dataproducts

                                  //     fields.dataproducts.push()
                                  //   }
                                  // }}
                                />
                              </>
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
