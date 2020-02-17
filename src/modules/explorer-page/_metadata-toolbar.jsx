import React, { PureComponent } from 'react'
import { Button, Toolbar, MenuButton, DialogContainer, TextField } from 'react-md'

export default class extends PureComponent {
  constructor(props) {
    super(props)
  }
  scrolltoRecord = (index, listRef) => {
    listRef.current.scrollToItem(index)
  }

  render() {
    const {
      saeonResults,
      icosResults,
      displayFilterMenu,
      setDisplayFilterMenu,
      currentSource,
      saeonListRef,
      icosListRef
    } = this.props

    return (
      <>
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
              onClick={() => {
                if (currentSource === 'saeon') this.scrolltoRecord(0, saeonListRef)
                else this.scrolltoRecord(0, icosListRef)
              }}
              icon
            >
              arrow_upward
            </Button>,
            //TO BOTTOM BUTTON
            <Button
              key={3}
              tooltipLabel="To bottom"
              onClick={() => {
                if (currentSource === 'saeon') this.scrolltoRecord(saeonResults.length - 1, saeonListRef)
                else this.scrolltoRecord(icosResults.length - 1, icosListRef)
              }}
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
