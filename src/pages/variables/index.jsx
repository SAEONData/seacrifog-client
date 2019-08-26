import React from 'react'
import Form from '../../modules/form'
import QueryRenderer from '../../modules/query-renderer'
import { VARIABLES } from '../../graphql/queries'
import { Card, CardTitle, CardText, Grid, Cell } from 'react-md'

export default () => (
  <QueryRenderer query={VARIABLES}>
    {data => (
      <Form someFormProp="initial value">
        {({ updateForm, someFormProp }) => (
          <Grid>
            <Cell size={12}>
              <Card>
                <CardTitle title="This is a title" subtitle="And subtitle" />
                <CardText>
                  <input
                    onChange={e => updateForm({ someFormProp: e.target.value })}
                  />
                  <input value={someFormProp} onChange={e => ''} />
                </CardText>
              </Card>
            </Cell>
          </Grid>
        )}
      </Form>
    )}
  </QueryRenderer>
)
