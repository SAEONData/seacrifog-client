import React, { PureComponent } from 'react'
import { Grid, TabsContainer, Tabs, Tab, Avatar } from 'react-md'
import MetadataRecord from './_metadata-record'

const tabsBackgroundColor = '#00897B'
const tabsBorderColor = 'rgba(255,255,255,0.3)'

const tabStyleSelected = {
  backgroundColor: 'white', //'#00796B',
  // borderRight: '1px solid ' + 'rgba(255,255,255,0.3)',
  height: 'max-content',
  padding: '7px'
}
const tabStyleNotSelected = {
  backgroundColor: 'white', //'#00897B',
  // borderRight: '1px solid ' + 'rgba(255,255,255,0.3)',
  height: 'max-content',
  padding: '7px'
}
const tabLabelStyleSelected = {
  backgroundColor: '#00897B',
  border: '1px solid rgba(255,255,255,0.3)',
  margin: '0px',
  color: 'white'
}
const tabLabelStyleNotSelected = {
  backgroundColor: '#004D40',
  border: '1px solid rgba(255,255,255,0.3)',
  margin: '0px',
  color: 'white'
}
/*
const searchResults = {
  one: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }, { title: 'two' }] }
  },
  two: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  three: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  four: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  five: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  six: {
    title: 'This is a temporary title xyz'
  },
  seven: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  eight: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  nine: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  ten: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  eleven: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  twelve: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  thirteen: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  fourteen: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  fifteen: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  sixteen: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  eighteen: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  nineteen: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  twenty: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  twentyTwo: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  twentyThree: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  twentyFour: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  twentyFive: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  twentySix: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  },
  twentySeven: {
    title: 'This is a temporary title xyz',
    metadata_json: { titles: [{ title: 'ONE' }] }
  }
}*/

const recordsPerPage = 50

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { selectedTabIndex: 1 }
  }

  render() {
    const { searchResults } = this.props
    return (
      <>
        <button>collapse all</button>
        <TabsContainer slideStyle={{ height: '100%', backgroundColor: 'white' }}>
          <Tabs
            id={'tabsid1'}
            tabId="tabsId1"
            indicatorHeight={0}
            style={{
              backgroundColor: 'white',
              border: '1px solid ' + tabsBorderColor,
              marginBottom: '50px'
            }}
          >
            {Math.ceil(searchResults[0].result.result_length / recordsPerPage).mapFromInt(index => {
              const tabIndex = index + 1
              return (
                <Tab
                  id={'Tab' + tabIndex}
                  key={tabIndex}
                  style={tabIndex === this.state.selectedTabIndex ? tabStyleSelected : tabStyleNotSelected}
                  icon={
                    <Avatar
                      key={tabIndex}
                      style={
                        tabIndex === this.state.selectedTabIndex ? tabLabelStyleSelected : tabLabelStyleNotSelected
                      }
                      contentStyle={{ fontSize: 20 }}
                      id={'tabAvatar' + tabIndex}
                    >
                      {tabIndex}
                    </Avatar>
                  }
                  onClick={() => {
                    this.setState({ selectedTabIndex: tabIndex })
                  }}
                >
                  {/* Left half of view */}
                  <Grid noSpacing style={{ border: '1px solid #00897B', float: 'left', width: '50%' }}>
                    {searchResults[0].result.results.map((r, recordIndex) => {
                      if (
                        (tabIndex - 1) * recordsPerPage <= recordIndex &&
                        recordIndex < recordsPerPage * tabIndex &&
                        recordIndex % 2 === 0
                      )
                        return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} />
                      else return null
                    })}
                  </Grid>
                  {/* Right half of view */}
                  <Grid noSpacing style={{ border: '1px solid #00897B', float: 'right', width: '50%' }}>
                    {searchResults[0].result.results.map((r, recordIndex) => {
                      if (
                        (tabIndex - 1) * recordsPerPage <= recordIndex &&
                        recordIndex < recordsPerPage * tabIndex &&
                        recordIndex % 2 === 1
                      )
                        return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} />
                      else return null
                    })}
                  </Grid>
                </Tab>
              )
            })}
          </Tabs>
        </TabsContainer>
      </>
      /*

   <TabsContainer>
          <Tabs
            id={'tabsid1'}
            tabId="tabsId1"
            style={{
              backgroundColor: tabsBackgroundColor,
              border: '1px solid ' + tabsBorderColor
            }}
          >
            {Math.ceil(Object.keys(chartDefinitions).length / 4).mapFromInt(index => {
              const tabIndex = index + 1
              return (
                <Tab
                  // className={'thisismyclassname'}
                  id={'Tab' + tabIndex}
                  key={tabIndex}
                  style={tabIndex === this.state.selectedTabIndex ? tabStyleSelected : tabStyleNotSelected}
                  icon={
                    <Avatar
                      key={tabIndex}
                      style={
                        tabIndex === this.state.selectedTabIndex ? tabLabelStyleSelected : tabLabelStyleNotSelected
                      }
                      contentStyle={{ fontSize: 20 }}
                      id={'tabAvatar' + tabIndex}
                    >
                      {tabIndex}
                    </Avatar>
                  }
                  onClick={() => {
                    this.setState({ selectedTabIndex: tabIndex })
                  }}
                >
                  <Grid style={{ backgroundColor: '#EEEEEE' }}>
                    {Object.entries(chartDefinitions).map(
                      ([chartIndex, { title, datafield, entryName, entryValue, dataFilter }]) => {
                        if (parseInt(chartIndex) + 1 > tabIndex * 4 - 4 && parseInt(chartIndex) + 1 <= tabIndex * 4)
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

   */
    )
  }
}
