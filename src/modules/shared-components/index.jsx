import React from 'react'
import { Grid, Cell, Button } from 'react-md'

export const NoneMessage = () => <p style={{ textAlign: 'center' }}>(None)</p>

export const FormattedInfo = ({ object }) => (
  <Grid>
    <Cell phoneSize={6} tabletSize={8} size={12}>
      {Object.keys(object).map(key => (
        <p key={key}>
          <b>{key}</b> {object[key]}
        </p>
      ))}
    </Cell>
  </Grid>
)

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
