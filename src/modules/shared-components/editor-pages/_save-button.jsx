import React from 'react'
import { Button } from 'react-md'

const buttonStyle = {
  float: 'right'
}

export default ({ saveEntity }) => (
  <Button onClick={saveEntity} style={buttonStyle} primary swapTheming flat iconChildren="save">
    Save
  </Button>
)
