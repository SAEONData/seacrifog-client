import React, { PureComponent } from 'react'
import { Button, Toolbar, MenuButton, DialogContainer, TextField } from 'react-md'

export default class extends PureComponent {
  constructor(props) {
    super(props)
  }
  scrolltoRecord = (index, ref) => ref.current.scrollToItem(index)

  render() {
    const { searchResultLengths, displayFilterMenu, setDisplayFilterMenu, currentSourceIndex, searchRefs } = this.props

    return (
      <>
        <Toolbar
          colored
          title={searchResultLengths.join(' results | ') + ' results'}
          style={{
            position: 'fixed',
            zIndex: 1000,
            left: '72px',
            right: 0
          }}
          actions={[
            // FILTER MENU
            <MenuButton
              key={0}
              id="filtermenubutton"
              menuItems={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
              tooltipLabel="Filter"
              icon
              position={'below'}
            >
              filter_list
            </MenuButton>,
            //SEARCH MENU
            <Button key={1} tooltipLabel="Search" onClick={() => setDisplayFilterMenu(!displayFilterMenu)} icon>
              search
            </Button>,
            //TO TOP BUTTON
            <Button
              key={2}
              tooltipLabel="To top"
              onClick={() => this.scrolltoRecord(0, searchRefs[currentSourceIndex])}
              icon
            >
              arrow_upward
            </Button>,
            //TO BOTTOM BUTTON
            <Button
              key={3}
              tooltipLabel="To bottom"
              onClick={() => this.scrolltoRecord(1, searchRefs[currentSourceIndex])}
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
          visible={displayFilterMenu}
          title="Search Menu"
          onHide={() => {
            setDisplayFilterMenu(false)
          }}
        >
          {' '}
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
      </>
    )
  }
}
