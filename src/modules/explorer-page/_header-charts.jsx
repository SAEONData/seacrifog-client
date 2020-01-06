import React, { PureComponent } from 'react'
import {
  Button,
  Card,
  Grid,
  Cell,
  CardText,
  CardTitle,
  ExpansionPanel,
  ExpansionList,
  FontIcon,
  Collapse
} from 'react-md'
import ECharts from 'echarts-for-react'
import echartsTheme from '../../lib/echarts-theme'
import { cardStyle } from './_shared'

//
export default class HeaderCharts extends PureComponent {
  state = { collapsed: true, expandIcon: 'expand_more' }

  componentWillMount() {
    this.setState({
      collapsed: true,
      expandIcon: 'expand_more'
    })
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      expandIcon: this.state.collapsed ? 'expand_more' : 'expand_less'
    })
  }
  render() {
    return (
      <div>
        <Button
          primary
          flat
          swapTheming
          onClick={this.toggle}
          iconChildren={['bar_chart', this.state.expandIcon]}
        ></Button>
        <Collapse collapsed={this.state.collapsed}>
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
                        console.log('args', this.props)
                      }
                    }}
                    option={{
                      series: [
                        {
                          data: this.props.data,
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
                        console.log('args', this.props)
                      }
                    }}
                    option={{
                      series: [
                        {
                          data: this.props.data,
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
                        console.log('args', this.props)
                      }
                    }}
                    option={{
                      series: [
                        {
                          data: this.props.data,
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
}
