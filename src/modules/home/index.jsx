import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, CardTitle, CardText } from 'react-md'

export default () => (
  <Card>
    <CardTitle title="This is a title" subtitle="And subtitle" />
    <CardText>
      <p>Hello! Edit me in /src/modules/home/index.jsx</p>
    </CardText>
  </Card>
)
