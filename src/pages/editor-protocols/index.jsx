import React from 'react'
import { Grid, Cell, Card, CardText, TextField, Button } from 'react-md'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOL } from '../../graphql/queries'

const simpleTextFields = ['AUTHOR', 'PUBLISHER', 'TITLE']

export default ({ id }) => (
  <DataQuery query={PROTOCOL} variables={{ id: parseInt(id) }}>
    {({ protocol }) => (
      // Spread operator, but used in JSX is not quite like the normal javascript spread
      <Form {...protocol}>
        {({ updateForm, ...fields }) => (
          <Grid>
            <Cell phoneSize={4} tabletSize={8} size={12}>
              <Card>
                <Grid>
                  <Cell phoneSize={4} tabletSize={8} size={6}>
                    <CardText>
                      {Object.entries(fields)
                        .filter(([fieldName]) => simpleTextFields.includes(fieldName.toUpperCase()))
                        .map(([label, value]) => (
                          <TextField label={label} value={value} onChange={val => updateForm({ [label]: val })} />
                        ))}
                      <Button
                        onClick={() => alert('This should call a GraphQL mutation and save a protocol')}
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
      </Form>
    )}
  </DataQuery>
)
