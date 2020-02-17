import React, { PureComponent } from 'react'
import { TabsContainer, Tabs, Tab } from 'react-md'
import MetadataRecordView from './_metadata-record-views'
import saeonLogo from '../../../public/saeon-logo.png'
import icosLogo from '../../../public/icos-logo.png'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import MetadataToolbar from './_metadata-toolbar'
/*TO DO
  Infinite Scrolling to be implemented still(react-window-infinite-loader) https://web.dev/virtualize-long-lists-react-window/
 */
/**BUGS:
 *One bug is that a browser user zooming out doesn't update 100vh until a rerender. Hopefully a more streamline solution can be found(Maybe giving body a height of 100vh but that may cause the zoom bug everywhere)
 */

/**
 * search results coming from the API are an ordered array
 * and will always be displayed in the same order
 */
const logos = [icosLogo, saeonLogo]

export default class extends PureComponent {
  state = {
    currentSourceIndex: 0,
    displayFilterMenu: false
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

  setDisplayFilterMenu(displayFilterMenu) {
    this.setState({ displayFilterMenu: displayFilterMenu })
  }

  render() {
    const { searchResults } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MetadataToolbar
          searchResultLengths={searchResults.map(s => s.result.results.length)}
          displayFilterMenu={this.state.displayFilterMenu}
          setDisplayFilterMenu={this.setDisplayFilterMenu} // TODO
          currentSourceIndex={this.state.currentSourceIndex}
          searchRefs={this.searchRefs}
        />
        <TabsContainer
          onTabChange={newActiveTabIndex => {
            newActiveTabIndex === 0
              ? this.setState({ listRef: this.saeonListRef, currentSource: 0 })
              : this.setState({ listRef: this.icosListRef, currentSource: 1 })
          }}
        >
          <Tabs className="tabs-header" tabId="tabsid">
            {/* Map each organization's results into a tab */}
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
