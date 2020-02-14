import React, { PureComponent } from 'react'
import {
  Toolbar,
  Button,
  TabsContainer,
  Tabs,
  Tab,
  MenuButton,
  DialogContainer,
  ListItem,
  List,
  TextField
} from 'react-md'
import MetadataRecord from './_metadata-record'
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

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { currentSource: 'saeon', displayFilterMenu: false }
  }
  saeonListRef = React.createRef()
  icosListRef = React.createRef()
  setDisplayFilterMenu(displayFilterMenu) {
    this.setState({ displayFilterMenu: displayFilterMenu })
  }

  /*This is used to calculate the height of a tab panel(container of metadata records). 
  The desired height is 100vh - height of any other elements above/below the tab panel
  This is necessary to avoid autoSizer collapsing its children with 0 height.*/
  vhToPx(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight

    var result = (y * value) / 100
    return result
  }
  tabPanelHeight = this.vhToPx(100) - 72 - 64 - 64
  render() {
    var { searchResults } = this.props
    if (!searchResults.length)
      searchResults = [
        {
          result: {
            results: ['some bindings']
          }
        },
        {
          result: {
            results: [
              {
                metadata_json: {
                  subjects: [
                    { subject: 'some subject' },
                    { subject: 'another subject' },
                    { subject: 'one last subject' }
                  ],
                  titles: [{ titleType: '', title: 'some title' }],
                  descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
                  creators: [{ name: 'some creator name' }],
                  contributors: [
                    { contributorType: 'ContactPerson', name: 'Brenda Daly' },
                    { contributorType: 'Distributor', name: 'SAEON' }
                  ],
                  publisher: 'some publisher',
                  dates: [
                    { dateType: 'collected', date: '2011' },
                    { dateType: 'another type of date', date: '2012' }
                  ],
                  publicationYear: '2020'
                }
              }
            ]
          }
        }
      ]
    const saeonResults = searchResults[1].result.results
    const icosResults = searchResults[0].result.results
    const saeonElements = saeonResults.map((r, recordIndex) => {
      return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} logo={saeonLogo} source="saeon" />
    })
    const icosElements = icosResults.map((r, recordIndex) => {
      return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} logo={icosLogo} source="icos" />
    })
    return (
      <div style={{ height: '100%' }}>
        <MetadataToolbar
          saeonResults={saeonResults}
          icosResults={icosResults}
          displayFilterMenu={this.state.displayFilterMenu}
          setDisplayFilterMenu={this.setDisplayFilterMenu}
          currentSource={this.state.currentSource}
          saeonListRef={this.saeonListRef}
          icosListRef={this.icosListRef}
        />

        <>
          <TabsContainer
            onTabChange={newActiveTabIndex => {
              newActiveTabIndex === 0
                ? this.setState({ listRef: this.saeonListRef, currentSource: 'saeon' })
                : this.setState({ listRef: this.icosListRef, currentSource: 'icos' })
            }}
          >
            <Tabs className="tabs-header" tabId="tabsid">
              {/* SAEON TAB */}
              <Tab icon={<img src={saeonLogo} style={{ height: '45px', margin: '0px' }} />} id="this-is-a-tab">
                <div style={{ height: this.tabPanelHeight, marginTop: '20px' }}>
                  <AutoSizer id="autosizer" style={{ textAlign: '-webkit-center' }}>
                    {({ height, width }) => {
                      return (
                        <FixedSizeList
                          className="thick-scrollbar"
                          height={height}
                          width={width}
                          itemCount={saeonElements.length}
                          // itemSize={120}
                          itemSize={500}
                          ref={this.saeonListRef}
                        >
                          {({ index, style }) => (
                            <div id={index} style={style}>
                              {saeonElements[index]}
                            </div>
                          )}
                        </FixedSizeList>
                      )
                    }}
                  </AutoSizer>
                </div>
              </Tab>
              {/* ICOS TAB */}
              <Tab icon={<img src={icosLogo} style={{ height: '45px', margin: '0px' }} />}>
                <div style={{ height: this.tabPanelHeight, marginTop: '20px' }}>
                  <AutoSizer id="autosizer" style={{ textAlign: '-webkit-center' }}>
                    {({ height, width }) => (
                      <div>
                        <FixedSizeList
                          className="thick-scrollbar"
                          height={height}
                          width={width}
                          itemCount={icosElements.length}
                          // itemSize={120}
                          itemSize={500}
                          ref={this.icosListRef}
                        >
                          {({ index, style }) => (
                            <div id={index} style={style}>
                              {icosElements[index]}
                            </div>
                          )}
                        </FixedSizeList>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </Tab>
            </Tabs>
          </TabsContainer>
        </>
      </div>
    )
  }
}
