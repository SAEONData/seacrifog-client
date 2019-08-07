import React from 'react'
import { Link, Route } from 'react-router-dom'
import { FontIcon, ListItem } from 'react-md'

export default ({ label, to, icon, exact, nestedItems, hasParent }) =>
  nestedItems ? (
    <ListItem
      primaryText={label}
      leftIcon={icon && !hasParent ? <FontIcon>{icon}</FontIcon> : null}
      nestedItems={nestedItems}
    />
  ) : (
    <Route path={to} exact={exact}>
      {({ match }) => {
        return (
          <ListItem
            component={Link}
            active={!!match}
            to={to}
            primaryText={label}
            leftIcon={icon && !hasParent ? <FontIcon>{icon}</FontIcon> : null}
            nestedItems={nestedItems}
          />
        )
      }}
    </Route>
  )