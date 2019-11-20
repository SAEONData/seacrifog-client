import React from 'react'
import { Toolbar, Button } from 'react-md'

const mainMenuIconStyle = {
  marginLeft: '10px',
  color: 'white'
}

const headerStyle = { backgroundColor: '#005fb3' }

export default ({ resetFn }) => (
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
      <Button onClick={resetFn} style={mainMenuIconStyle} icon>
        refresh
      </Button>
    ]}
  />
)
