import React from 'react'
import { Grid, Cell, Card, CardText, TextField, Button } from 'react-md'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import Form from '../../modules/form'
import { VARIABLE } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
//VARIABLES EDITOR

//The fields to be displayed but as disabled(greyed out)
const noneditableFields = ['ID', 'UPDATED_BY', 'UPDATED_AT']
//The fields NOT to be displayed at all
const hiddenFields = [
  'INDIRECTLY_RELATED_PROTOCOLS',
  'DIRECTLY_RELATED_PROTOCOLS',
  'RFORCINGS',
  'DATAPRODUCTS',
  '__TYPENAME'
]

//errorFields are never used. All of these(except for typename) hold Object arrays which cause an error on useMutation().
//Look into what the best way to handle these is. Currently these fields are ignored in useMutation
// const errorFields = [
//   'INDIRECTLY_RELATED_PROTOCOLS',
//   'DIRECTLY_RELATED_PROTOCOLS',
//   'RFORCINGS',
//   'DATAPRODUCTS',
//   '__TYPENAME'
// ]

export default ({ id }) => (
  <DataQuery query={VARIABLE} variables={{ id: parseInt(id) }}>
    {({ variable }) => (
      // Spread operator, but used in JSX is not quite like the normal javascript spread
      <Form {...variable}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_VARIABLES}>
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
                                id={'update-form-variable' + i}
                                key={i}
                                label={label}
                                disabled={noneditableFields.includes(label.toUpperCase()) ? true : false}
                                value={value != null ? value : undefined}
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
