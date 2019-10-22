import React from 'react'
import { Grid, Cell, Card, CardText } from 'react-md'

export default () => (
  <Grid>
    <Cell phoneSize={6} tabletSize={8} size={6}>
      <Card>
        <CardText>
          <CardText>Look at the echarts-example branch to see this example</CardText>
        </CardText>
      </Card>
    </Cell>
    <Cell phoneSize={6} tabletSize={8} size={6}>
      <Card>
        <CardText>
          <CardText>Look at the echarts-example branch to see this example</CardText>
        </CardText>
      </Card>
    </Cell>
    <Cell phoneSize={6} tabletSize={8} size={12}>
      <Card>
        <CardText>Look at the echarts-example branch to see this example</CardText>
      </Card>
    </Cell>
  </Grid>
)
