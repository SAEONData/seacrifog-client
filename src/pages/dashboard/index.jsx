import React from 'react'
import { Grid, Cell, Card, CardText } from 'react-md'
import EChart from '../../modules/echarts'

export default () => (
  <Grid>
    <Cell phoneSize={6} tabletSize={8} size={6}>
      <Card>
        <CardText>
          <EChart
            option={{
              title: {
                text: 'Variables',
                subtext: 'by Class',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['A', 'B', 'C', 'D', 'E']
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                    { value: 335, name: 'A' },
                    { value: 310, name: 'B' },
                    { value: 234, name: 'C' },
                    { value: 135, name: 'D' },
                    { value: 1548, name: 'E' }
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }}
          />
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
