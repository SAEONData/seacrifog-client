import React, { PureComponent } from 'react'
import { FixedSizeList } from 'react-window'
import { TabsContainer, Tabs, Tab, Button, Toolbar } from 'react-md'
import AutoSizer from 'react-virtualized-auto-sizer'
import saeonLogo from '../../../public/saeon-logo.png'
import icosLogo from '../../../public/icos-logo.png'
import { GlobalStateContext } from '../../global-state'
import MetadataRecordView from '../../modules/metadata-record-views'

const scrolltoRecord = (index, ref) => ref.current.scrollToItem(index)
const logos = [icosLogo, saeonLogo]

class View extends PureComponent {
  state = {
    currentIndex: 0
  }

  /*This is used to calculate the height of a tab panel(container of metadata records). 
  The desired height is 100vh - height of any other elements above/below the tab panel
  This is necessary to avoid autoSizer collapsing its children with 0 height.*/
  vhToPx(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      y = w.innerHeight || e.clientHeight || g.clientHeight

    var result = (y * value) / 100
    return result
  }

  tabPanelHeight = this.vhToPx(100) - 72 - 64 - 64

  constructor(props) {
    super(props)
    this.searchRefs = props.searchResults.map(() => React.createRef())
  }

  render() {
    const { searchRefs } = this
    const { searchResults } = this.props
    const { currentIndex } = this.state
    return (
      <div style={{ height: '100%' }}>
        <Toolbar
          colored
          title={searchResults.map(s => s.result.results.length).join(' results | ') + ' results'}
          actions={[
            <Button key={0} tooltipLabel="To top" onClick={() => scrolltoRecord(0, searchRefs[currentIndex])} icon>
              arrow_upward
            </Button>,
            <Button
              key={1}
              tooltipLabel="To bottom"
              onClick={() =>
                scrolltoRecord(
                  searchResults.map(s => s.result.results.length)[currentIndex] - 1,
                  searchRefs[currentIndex]
                )
              }
              icon
            >
              arrow_downward
            </Button>
          ]}
        />

        <TabsContainer onTabChange={currentIndex => this.setState({ currentIndex })}>
          <Tabs tabId="metadata-search-tabs">
            {searchResults.map((r, i) => (
              <Tab key={i} icon={<img src={logos[i]} style={{ height: '45px', margin: '0px' }} />}>
                <div style={{ height: this.tabPanelHeight, marginTop: '20px' }}>
                  <AutoSizer id={`autosizer-${i}`} style={{ textAlign: '-webkit-center' }}>
                    {({ height, width }) => {
                      return (
                        <FixedSizeList
                          className="thick-scrollbar"
                          height={height}
                          width={width}
                          itemCount={searchResults[i].result.results.length}
                          itemSize={500}
                          ref={this.searchRefs[i]}
                        >
                          {({ index, style }) => (
                            <div id={index} style={style}>
                              {
                                searchResults[i].result.results.map((r, j) => (
                                  <MetadataRecordView
                                    record={r}
                                    index={j + 1}
                                    key={j}
                                    logo={logos[i]}
                                    sourceIndex={i}
                                  />
                                ))[index]
                              }
                            </div>
                          )}
                        </FixedSizeList>
                      )
                    }}
                  </AutoSizer>
                </div>
              </Tab>
            ))}
          </Tabs>
        </TabsContainer>
      </div>
    )
  }
}

export default () => (
  <GlobalStateContext.Consumer>
    {({ searchResults }) =>
      searchResults.length ? <View searchResults={searchResults} /> : <p>No metadata available for selection</p>
    }
  </GlobalStateContext.Consumer>
)
