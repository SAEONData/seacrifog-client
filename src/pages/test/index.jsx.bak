import React from 'react'
import DataQuery from '../../modules/data-query'
import { VARIABLE } from '../../graphql/queries'
import { Button, Grid, Cell, SVGIcon, Card, CardText } from 'react-md'
import { DatabaseIcon, PencilIcon } from '../../svg-icons'

const InlineSvgIcon = ({ size }) => (
  <SVGIcon primary size={size} desc={'Test SVG icon'}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </SVGIcon>
)

const ZachsTests = () => (
  <Grid>
    <Cell size={12}>
      <Card>
        <CardText>
          <Button icon>
            <PencilIcon />
          </Button>
        </CardText>
        <CardText>
          <Button icon>
            <DatabaseIcon primary={true} />
          </Button>
        </CardText>
        <CardText>
          <InlineSvgIcon size={48} />
        </CardText>
        <CardText>
          <Button icon>
            <InlineSvgIcon />
          </Button>
        </CardText>
      </Card>
    </Cell>
  </Grid>
)

export default () => (
  <DataQuery query={VARIABLE} variables={{ id: 4 }}>
    {({ variable }) => (
      <>
        <span>{variable.name} </span>
        <Button
          flat
          primary
          swapTheming
          onClick={() => {
            const domain = variable.domain
            alert(domain)
          }}
        >
          Get my domain
        </Button>
        <ZachsTests />
      </>
    )}
  </DataQuery>
)
