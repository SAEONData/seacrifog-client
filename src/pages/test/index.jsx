import React from 'react'
import DataQuery from '../../modules/data-query'
import { VARIABLE } from '../../graphql/queries'
import { Button } from 'react-md'

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
      </>
    )}
  </DataQuery>
)
