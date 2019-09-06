import React from 'react'
import { Button, Grid, Cell } from 'react-md'

export const GoToButton = ({ id }) => (
  <Button
    secondary
    tooltipLabel={`Go to ${id}`}
    tooltipPosition="top"
    onClick={() => alert('this will navigate to the variable that is clicked')}
    icon
  >
    remove_red_eye
  </Button>
)

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
