import React from 'react'
import { Button } from 'react-md'

export const ScrollButton = ({ disabled }) => (
  <Button
    key={'reset-form-button'}
    primary
    disabled={disabled}
    tooltipPosition={'left'}
    style={{ display: 'flex', marginRight: '20px' }}
    icon
    onClick={() => alert('This will make the page scroll down')}
  >
    arrow_downward
  </Button>
)
