import React from 'react'
import { Button } from 'react-md'

export const LinkButton = ({ active }) => (
  <Button
    secondary
    tooltipPosition={'left'}
    disabled={active}
    tooltipLabel={'Go to <insert URL here>'}
    style={{ display: 'flex', marginRight: '20px' }}
    icon
    onClick={() => alert('todo')}
  >
    link
  </Button>
)
