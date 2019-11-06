import React from 'react'
import { Grid, Cell, Card, CardText, TextField, Button } from 'react-md'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import Form from '../../modules/form'
import { PROTOCOL } from '../../graphql/queries'
import { UPDATE_PROTOCOLS } from '../../graphql/mutations'
//EDITOR PROTOCOLS

const editableFields = [
  'AUTHOR',
  'PUBLISHER',
  'TITLE',
  'PUBLISHER',
  'TITLE',
  'COVERAGE_TYPE',
  'CATEGORY',
  'DOMAIN',
  'PURPOSE',
  'ABSTRACT',
  'LICENSE',
  'LANGUAGE',
  'FORMAT',
  'SUSTAINABILITY',
  'VERSION',
  'RESOLUTION',
  'COST',
  'SOURCE'
]

export default ({ id }) => (
  <DataQuery query={PROTOCOL} variables={{ id: parseInt(id) }}>
    {({ protocol }) => (
      // Spread operator, but used in JSX is not quite like the normal javascript spread
      <Form {...protocol}>
        {({ updateForm, ...fields }) => (
          <DataMutation mutation={UPDATE_PROTOCOLS}>
            {({ executeMutation }) => (
              <Grid>
                <Cell phoneSize={4} tabletSize={8} size={12}>
                  <Card>
                    <Grid>
                      <Cell phoneSize={4} tabletSize={8} size={6}>
                        <CardText>
                          {Object.entries(fields)
                            .filter(([field]) => editableFields.includes(field.toUpperCase()))
                            .map(([label, value], i) => (
                              <TextField
                                id={'update-form-protocol' + i}
                                key={i}
                                label={label}
                                value={value}
                                onChange={val => updateForm({ [label]: val })}
                              />
                            ))}
                          <Button
                            onClick={() =>
                              executeMutation({
                                variables: {
                                  input: [
                                    {
                                      id: fields.id,
                                      ...Object.fromEntries(
                                        Object.entries(fields).filter(field =>
                                          editableFields.includes(field[0].toUpperCase())
                                        )
                                      )
                                    }
                                  ]
                                }
                              })
                            }
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
