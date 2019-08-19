import React from 'react'
import { Card, CardTitle, CardText, Grid, Cell } from 'react-md'

export default () => (
  <Grid>
    <Cell size={12}>
      <Card>
        <CardTitle title="This is a title" subtitle="And subtitle" />
        <CardText>
          <p>Hello! About page</p>
        </CardText>
      </Card>
    </Cell>
  </Grid>
)
