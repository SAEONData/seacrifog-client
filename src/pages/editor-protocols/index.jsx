import React from 'react'
import { PROTOCOL } from '../../graphql/queries'
import { UPDATE_PROTOCOLS } from '../../graphql/mutations'
import { fieldDefinitions } from './protocol-definitions'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { Grid, Cell, Card, TextField } from 'react-md'
import Form from '../../modules/form'
import EntityEditor from '../../modules/shared-components/entity-editor'
import SaveButton from '../../modules/shared-components/save-button'

//EDITOR PROTOCOLS

export default ({ id }) => (
  <DataQuery query={PROTOCOL} variables={{ id: parseInt(id) }}>
    {({ protocol }) => (
      <Form {...protocol}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_PROTOCOLS}>
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
                        saveButtonOnClick(fields, fieldDefinitions, executeMutation)
                      }}
                    />

                    <Grid>
                      <Cell phoneSize={4} tabletSize={8} size={6} id="entity-editor-cell">
                        <h1>Properties</h1>
                        <EntityEditor
                          executeMutation={executeMutation}
                          fieldDefinitions={fieldDefinitions}
                          entityProp={protocol}
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
                    <SaveButton
                      fields={fields}
                      fieldDefinitions={fieldDefinitions}
                      containerStyle={{ display: 'inline-block', width: '100%' }}
                      buttonStyle={{ marginTop: '15px', marginRight: '15px', marginBottom: '15px', float: 'right' }}
                      progressStyle={{ float: 'right' }}
                      onClick={() => {
                        saveButtonOnClick(fields, fieldDefinitions, executeMutation)
                      }}
                    />
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

function saveButtonOnClick(fields, fieldDefinitions, executeMutation) {
  const editedFields = Object.entries(fields).filter(field => {
    if (fieldDefinitions[field[0]].display && fieldDefinitions[field[0]].editable) {
      //Removing undefined Numbers and Dates
      if (fieldDefinitions[field[0]].type === Number || fieldDefinitions[field[0]].type === Date)
        if (field[1] != null && field[1] !== undefined && field[1] !== '') return true
        //must be defined
        else return false
      //here if Date/Number is undefined
      else return true //here if type IS NOT Number or Date AND is editable and displayed
    }
    return false //here if field is not editable or displayed
  })
  for (var field of editedFields) {
    if (fieldDefinitions[field[0]].type === String) {
      //Replacing all occurances of single quotes with 2 single quotes. This allows the postgres DB to correctly read strings with single quotes in them
      if (field[1] !== undefined && field[1] != null) field[1] = field[1].replace(/'/g, "''")
      //Making sure undefined values dont get saved as "null"
      else field[1] = ''
    }
    //Converting any Fields that GraphQL sees as Floats or Integers to JS Numbers since they are currently strings.
    if (fieldDefinitions[field[0]].type === Number) {
      field[1] = parseFloat(field[1])
    }
  }
  console.log("Save Button clicked! User's input:")
  console.log(editedFields)
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
}
