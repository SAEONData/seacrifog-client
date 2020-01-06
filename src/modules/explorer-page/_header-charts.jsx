import React, { Component } from 'react'
import { Card, Grid, Cell, CardText, CardTitle, Collapse } from 'react-md'
import ECharts from 'echarts-for-react'
import echartsTheme from '../../lib/echarts-theme'
import { cardStyle } from './_shared'

export default ({ collapsed, data }) => {
  return (
    <>
      <Collapse collapsed={collapsed}>
        <Grid style={{ backgroundColor: '#EEEEEE' }}>
          <Cell>
            <Card style={cardStyle}>
              <CardTitle title="Sites per selected Network" />
              <CardText>
                <ECharts
                  notMerge={true}
                  lazyUpdate={false}
                  theme={echartsTheme}
                  onEvents={{
                    click: () => {
                      console.log('Pie has been clicked!')
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
    </>
  )
}
