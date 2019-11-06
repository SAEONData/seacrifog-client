import React from 'react'
import { Grid, Cell, Card, CardText, TextField, Button } from 'react-md'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import Form from '../../modules/form'
import { DATAPRODUCT } from '../../graphql/queries'
import { UPDATE_DATAPRODUCTS } from '../../graphql/mutations'
//DATAPRODUCTS EDITOR

//The fields to be displayed but as disabled(greyed out)
const noneditableFields = ['ID', 'DOI']
//The fields NOT to be displayed at all
const hiddenFields = [
  //most/all of these cause errors. Likely DataType issues, consider changing how these data types are handled. Add typeof(field) to textField label for quicker debugging
  'COVERAGE_SPATIAL',
  '__TYPENAME',
  'VARIABLES',
  'CREATED_AT',
  'MODIFIED_AT', //ERROR
  'FILE_SIZE', //ERROR
  'RES_TEMPERATURE', //ERROR
  'UNCERTAINTY', //ERROR
  'COVERAGE_TEMP_START',
  'COVERAGE_TEMP_END', //ERROR

  'PUBLISH_DATE' //ERROR
]

export default ({ id }) => (
  <DataQuery query={DATAPRODUCT} variables={{ id: parseInt(id) }}>
    {({ dataproduct }) => (
      // Spread operator, but used in JSX is not quite like the normal javascript spread
      <Form {...dataproduct}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_DATAPRODUCTS}>
            {({ executeMutation }) => (
              <Grid>
                <Cell phoneSize={4} tabletSize={8} size={12}>
                  <Card>
                    <Grid>
                      <Cell phoneSize={4} tabletSize={8} size={6}>
                        <CardText>
                          {Object.entries(fields)
                            .filter(([field]) => !hiddenFields.includes(field.toUpperCase())) //removing any unwanted columns
                            .map(([label, value], i) => (
                              <TextField
                                id={'update-form-dataproduct' + i}
                                key={i}
                                label={label}
                                disabled={noneditableFields.includes(label.toUpperCase()) ? true : false}
                                value={value != null ? value : ''} //NOTE: This can cause null values to be saved as "null" if editor is opened and saved
                                onChange={val => updateForm({ [label]: val })}
                              />
                            ))}
                          <Button
                            onClick={() => {
                              const editableFields = Object.entries(fields).filter(
                                field =>
                                  !noneditableFields.includes(field[0].toUpperCase()) &&
                                  !hiddenFields.includes(field[0].toUpperCase())
                              )

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
)
