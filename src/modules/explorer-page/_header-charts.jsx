import React, { PureComponent } from 'react'
import { Button, Card, Grid, Cell, CardText, CardTitle, Collapse } from 'react-md'
import ECharts from 'echarts-for-react'
import echartsTheme from '../../lib/echarts-theme'
import { cardStyle } from './_shared'

export default ({ collapsed, data, ...props }) => {
  return (
    <div>
      <Collapse collapsed={collapsed}>
        <Grid>
          <Cell>
            <Card style={cardStyle}>
              <CardTitle title="Sites per selected Network" />
              <CardText>
                <ECharts
                  notMerge={true}
                  lazyUpdate={false}
                  theme={echartsTheme}
                  onEvents={{
                    click: event => {
                      console.log('Pie has been clicked!')
                      console.log('event', event)
                      console.log('args', props)
                    }
                  }}
                  option={{
                    series: [
                      {
                        data: data,
                        type: 'pie'
                      }
                    ]
                  }}
                />
              </CardText>
            </Card>
          </Cell>

          <Cell>
            <Card style={cardStyle}>
              <CardTitle title="Sites per selected Network" />
              <CardText>
                <ECharts
                  // style={{ height: '100%' }}
                  notMerge={true}
                  lazyUpdate={false}
                  theme={echartsTheme}
                  onEvents={{
                    click: event => {
                      console.log('Pie has been clicked!')
                      console.log('event', event)
                      console.log('args', props)
                    }
                  }}
                  option={{
                    series: [
                      {
                        data: data,
                        type: 'pie'
                      }
                    ]
                  }}
                />
              </CardText>
            </Card>
          </Cell>

          <Cell>
            <Card style={cardStyle}>
              <CardTitle title="Sites per selected Network" />
              <CardText>
                <ECharts
                  // style={{ height: '100%' }}
                  notMerge={true}
                  lazyUpdate={false}
                  theme={echartsTheme}
                  onEvents={{
                    click: event => {
                      console.log('Pie has been clicked!')
                      console.log('event', event)
                      console.log('args', props)
                    }
                  }}
                  option={{
                    series: [
                      {
                        data: data,
                        type: 'pie'
                      }
                    ]
                  }}
                />
              </CardText>
            </Card>
          </Cell>
        </Grid>
      </Collapse>
    </div>
  )
}
