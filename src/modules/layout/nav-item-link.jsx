import React from 'react'
import { Link, Route } from 'react-router-dom'
import { FontIcon, ListItem } from 'react-md'

export default ({ label, to, icon, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => {
      return (
        <ListItem
          tileClassName={'md-list-tile--mini'} // TODO: This is a hack for a bug (https://github.com/mlaursen/react-md/issues/304). But nested items are a problem
          component={Link}
          active={!!match}
          to={to}
          primaryText={label}
          leftIcon={icon ? <FontIcon>{icon}</FontIcon> : null}
        />
      )
    }}
  />
)
