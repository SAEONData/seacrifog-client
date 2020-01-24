import React, { PureComponent } from 'react'
import { Collapse, Grid, TabsContainer, Tabs, Tab, Avatar } from 'react-md'
import ExplorerHeaderChart from './_header-chart'
import { ApolloConsumer } from '@apollo/react-hooks'
import { ShowChartsState } from '../../chart-state'

Number.prototype.mapFromInt = function(cb) {
  const result = []
  for (let i = 0; i < this; i++) {
    result.push(cb(i))
  }
  return result
}

//colors and styling used multiple times on this component. Should maybe be somewhere else
const tabBackgroundColor = '#00897B'
const tabBorderColor = 'rgba(255,255,255,0.3)'
const labelInnerColor = '#00796B'
const tabStyle = {
  backgroundColor: tabBackgroundColor,
  borderRight: '1px solid ' + tabBorderColor,
  height: 'max-content',
  padding: '7px'
}

export class Charts extends PureComponent {
  static contextType = ShowChartsState

  state = {
    data: null
  }

  async componentDidMount() {
    await this.setData()
  }

  async componentDidUpdate() {
    await this.setData()
  }

  async setData() {
    const { client, query, variables } = this.props
    const { data, loading, error } = await client.query({ query, variables })
    this.setState({
      data
      // loading,
      // error
    })
  }

  render() {
    const { chartDefinitions } = this.props
    const { data, loading } = this.state
    const { showCharts } = this.context
    return loading || !data ? null : (
      <Collapse collapsed={!showCharts}>
        <TabsContainer>
          <Tabs
            id={'tabsid1'}
            tabId="tabsId1"
            style={{
              backgroundColor: tabBackgroundColor,
              border: '1px solid ' + tabBorderColor
            }}
          >
            {Math.ceil(Object.keys(chartDefinitions).length / 4).mapFromInt(tabIndex => {
              return (
                <Tab
                  // className={'thisismyclassname'}
                  id={'Tab' + tabIndex}
                  key={tabIndex}
                  style={tabStyle}
                  icon={
                    <Avatar
                      key={tabIndex}
                      style={{ backgroundColor: labelInnerColor, border: '1px solid ' + tabBorderColor, margin: '0px' }}
                      contentStyle={{ fontSize: 20 }}
                      id={'tabAvatar' + tabIndex}
                    >
                      {tabIndex + 1}
                    </Avatar>
                  }
                >
                  <Grid style={{ backgroundColor: '#EEEEEE' }}>
                    {Object.entries(chartDefinitions).map(
                      ([chartIndex, { title, datafield, entryName, entryValue, dataFilter }]) => {
                        if (
                          parseInt(chartIndex) + 1 > (tabIndex + 1) * 4 - 4 &&
                          parseInt(chartIndex) + 1 <= (tabIndex + 1) * 4
                        )
                          return (
                            <ExplorerHeaderChart
                              id={'explorer-chart' + chartIndex}
                              key={'explorer-chart' + chartIndex}
                              title={title}
                              data={dataFilter(data[datafield]).map(r => ({
                                value: r[entryValue],
                                name: r[entryName]
                              }))}
                            />
                          )
                        else return null
                      }
                    )}
                  </Grid>
                </Tab>
              )
            })}
          </Tabs>
        </TabsContainer>
      </Collapse>
    )
  }
}

export default props => <ApolloConsumer>{client => <Charts client={client} {...props} />}</ApolloConsumer>
