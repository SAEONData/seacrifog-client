import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-md'

export const EditButton = ({ to }) => (
  <Link to={to}>
    <Button icon>edit</Button>
  </Link>
)
