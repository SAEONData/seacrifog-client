import React from 'react'
import { Grid, Cell } from 'react-md'

export default () => (
  <Grid>
    <Cell phoneSize={6} tabletSize={8} size={12}>
      <h3>SEACRIFOG Collaborative Inventory Tool</h3>
      <p>
        The{' '}
        {
          <a href="http://www.seacrifog.eu/" target="_blank" rel="noopener noreferrer">
            SEACRIFOG Project
          </a>
        }{' '}
        aims to design a continental network of research infrastructures for the observation of climate change and other environmental changes linked
        to greenhouse gas emissions and food security across the African continent and the surrounding oceans.
      </p>
      <p>
        The SEACRIFOG Collaborative Inventory Tool serves to systematically capture information on relevant variables, observation infrastructures,
        existing data products and methodological protocols. The tool further serves as a public resource, informing about the state of environmental
        observation across the African continent and the surrounding oceans and supporting research infrastructure development.
      </p>
      <p>
        For further reading on the SEACRIFOG project and its outcomes to date, please click{' '}
        {
          <a href="https://www.seacrifog.eu/publications/publications/" target="_blank" rel="noopener noreferrer">
            here
          </a>
        }
      </p>
    </Cell>
  </Grid>
)
