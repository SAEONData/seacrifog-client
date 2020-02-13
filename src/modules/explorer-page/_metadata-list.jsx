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
/*
  Infinite Scrolling to be implemented still(react-window-infinite-loader) https://web.dev/virtualize-long-lists-react-window/
 */
/**BUGS:
 * Zoom bug mentioned by vhToPx()
 * middle click press scroll sometimes doesn't work within tabPanel. Might be only happening of right half of panel but unsure. Cause unknown(maybe z-index issues)
 * ICOS to bottom button somehow broke
 */
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { listRef: this.saeonListRef, displayFilterMenu: false }
  }
  saeonListRef = React.createRef()
  icosListRef = React.createRef()

  scrolltoRecord = (index, listRef) => {
    listRef.current.scrollToItem(index)
  }

  /*This is used to calculate the height of a tab panel(container of metadata records). 
  The desired height is 100vh - height of any other elements above/below the tab panel
  This is necessary to avoid autoSizer collapsing its children with 0 height. 
  One bug is that a browser user zooming out doesn't update 100vh until a rerender.
  Hopefully a more streamline solution can be found(Maybe giving body a height of 100vh but that may cause the zoom bug everywhere)   */
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
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} },
              { metadata_jsonFake: {} }
            ]
          }
        }
      ]
    const saeonResults = searchResults[1].result.results
    const icosResults = searchResults[0].result.results
    const saeonElements = saeonResults.map((r, recordIndex) => {
      return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} logo={saeonLogo} />
    })
    const icosElements = icosResults.map((r, recordIndex) => {
      return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} logo={icosLogo} />
    })
    return (
      <div style={{ height: '100%' }}>
        {/* SAEON RECORDS */}
        <Toolbar
          colored
          title={saeonResults.length + ' SAEON metadata records | ' + icosResults.length + ' ICOS metadata records'}
          style={{
            position: 'fixed',
            zIndex: 1000,
            left: '72px',
            right: 0
          }}
          actions={[
            // FILTER MENU
            <MenuButton
              id="filtermenubutton"
              menuItems={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
              tooltipLabel="Filter"
              icon
              position={'below'}
            >
              filter_list
            </MenuButton>,
            //SEARCH MENU
            <Button
              tooltipLabel="Search"
              onClick={() => this.setState({ displayFilterMenu: !this.state.displayFilterMenu })}
              icon
            >
              search
            </Button>,
            //TO TOP BUTTON
            <Button tooltipLabel="To top" onClick={() => this.scrolltoRecord(0, this.state.listRef)} icon>
              arrow_upward
            </Button>,
            //TO BOTTOM BUTTON
            <Button
              tooltipLabel="To bottom"
              onClick={() => this.scrolltoRecord(saeonElements.length - 1, this.state.listRef)}
              icon
            >
              arrow_downward
            </Button>
          ]}
        />
        {/*This fake toolbar renders behind the real toolbar so that real content doesn't. Hopefully some css can make this not needed */}
        <Toolbar />
        <DialogContainer
          id="dialog-container"
          visible={this.state.displayFilterMenu}
          title="Search Menu"
          onHide={() => {
            this.setState({ displayFilterMenu: false })
          }}
        >
          <TextField id="textfield" label="Associated Variables" defaultValue="variables list"></TextField>
          <TextField id="textfield" label="Date Created" defaultValue="some date"></TextField>
          <TextField id="textfield" label="Date Modified" defaultValue="some date"></TextField>
          <Button flat secondary>
            Cancel
          </Button>
          <Button flat primary>
            Save
          </Button>
        </DialogContainer>
        <>
          <TabsContainer
            onTabChange={newActiveTabIndex => {
              newActiveTabIndex === 0
                ? this.setState({ listRef: this.saeonListRef })
                : this.setState({ listRef: this.icosListRef })
            }}
          >
            <Tabs className="tabs-header" tabId="tabsid">
              {/* SAEON TAB */}
              <Tab icon={<img src={saeonLogo} style={{ height: '45px', margin: '0px' }} />} id="this-is-a-tab">
                <div style={{ height: this.tabPanelHeight }}>
                  <AutoSizer id="autosizer" style={{ textAlign: '-webkit-center' }}>
                    {({ height, width }) => {
                      return (
                        <FixedSizeList
                          className="thick-scrollbar"
                          height={height}
                          width={width}
                          itemCount={saeonElements.length}
                          itemSize={120}
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
                <div style={{ height: this.tabPanelHeight }}>
                  <AutoSizer id="autosizer" style={{ textAlign: '-webkit-center' }}>
                    {({ height, width }) => (
                      <div>
                        <FixedSizeList
                          className="thick-scrollbar"
                          height={height}
                          width={width}
                          itemCount={icosElements.length}
                          itemSize={120}
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
