import React from 'react'
import { Button } from 'react-md'

export const ScrollButton = ({ disabled, click }) => (
  <Button
    key={'reset-form-button'}
    primary
    disabled={disabled}
    tooltipPosition={'left'}
    style={{ display: 'flex', marginRight: '20px' }}
    icon
    onClick={click}
  >
    arrow_downward
  </Button>
)
