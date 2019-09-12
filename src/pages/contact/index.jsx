import React from 'react'
import { Grid, Cell } from 'react-md'

export default () => (
  <Grid>
    <Cell phoneSize={6} tabletSize={8} size={12}>
      <address>
        <p>
          Current maintainer:{' '}
          <a href="mailto:zach@saeon.ac.za" target="_blank">
            SAEON Ulwazi
          </a>
        </p>
        <p>
          SAEON uLwazi Node, Hertzog Blvd
          <br />
          Foreshore, Cape Town
          <br />
          South Africa
          <br />
          8001
        </p>
        <p>
          <a
            href="https://www.google.com/maps/dir/-33.919964,18.4276409/SAEON+uLwazi+Node,+Hertzog+Blvd,+Foreshore,+Cape+Town,+8001/@-33.9200695,18.4256864,17z/data=!3m1!4b1!4m17!1m6!3m5!1s0x1dcc5df2bfdcb0a9:0x8086aad31da973bf!2sSAEON+uLwazi+Node!8m2!3d-33.9200261!4d18.42803!4m9!1m1!4e1!1m5!1m1!1s0x1dcc5df2bfdcb0a9:0x8086aad31da973bf!2m2!1d18.42803!2d-33.9200261!3e2"
            target="_blank"
          >
            Get directions
          </a>
        </p>
      </address>
    </Cell>
  </Grid>
)
