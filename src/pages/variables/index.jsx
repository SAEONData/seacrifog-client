import React from 'react'
import Form from '../../modules/form'
import QueryRenderer from '../../modules/query-renderer'
import { VARIABLES } from '../../graphql/queries'
import { Card, CardTitle, CardText, Grid, Cell } from 'react-md'

export default () => (
  <QueryRenderer query={VARIABLES}>
    {data => (
      <Form>
        {({ form, updateForm }) => (
          <Grid>
            <Cell size={12}>
              <Card>
                <CardTitle title="This is a title" subtitle="And subtitle" />
                <CardText>
                  <p>Hello! essential-variables page</p>
                </CardText>
              </Card>
            </Cell>
          </Grid>
        )}
      </Form>
    )}
  </QueryRenderer>
)
