import React from 'react'
import { Button } from 'react-md'

export const DownloadButton = ({ active }) => (
  <Button
    secondary
    tooltipPosition={'left'}
    disabled={active}
    tooltipLabel={'Download collated information for the selected row'}
    style={{ display: 'flex', marginRight: '20px' }}
    icon
    onClick={() => alert('todo')}
  >
    picture_as_pdf
  </Button>
)
