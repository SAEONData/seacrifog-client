import React from 'react'
import { Toolbar, Button } from 'react-md'
import { GlobalStateContext } from '../../../global-state'

const mainMenuIconStyle = {
  marginLeft: '10px',
  color: 'white'
}

const headerStyle = { backgroundColor: '#005fb3' }

export default () => (
  <GlobalStateContext.Consumer>
    {({ updateSelectedProtocols }) => (
      <Toolbar
        title={'Notifications, link controls, MetaData explorer, etc.'}
        style={headerStyle}
        actions={[
          <Button style={mainMenuIconStyle} icon>
            filter_list
          </Button>,
          <Button style={mainMenuIconStyle} icon>
            save_alt
          </Button>,
          <Button onClick={() => updateSelectedProtocols([])} style={mainMenuIconStyle} icon>
            refresh
          </Button>
        ]}
      />
    )}
  </GlobalStateContext.Consumer>
)
