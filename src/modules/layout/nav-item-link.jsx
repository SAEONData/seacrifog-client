import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Avatar, FontIcon, ListItem } from 'react-md'

export default ({ label, to, icon, exact, href, avatar }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <ListItem
        tileClassName={'md-list-tile--mini md-tile-content--left-avatar'} // TODO: This is a hack for a bug (https://github.com/mlaursen/react-md/issues/304). But nested items are a problem
        component={href ? 'a' : Link}
        active={match && !href}
        rel={href && 'noopener noreferrer'}
        target={href && '_blank'}
        to={to}
        href={href}
        primaryText={label}
        leftIcon={
          icon ? (
            <FontIcon>{icon}</FontIcon>
          ) : avatar ? (
            <Avatar
              style={avatar.style ? {} : { backgroundColor: 'transparent', border: 'none' }}
              {...avatar}
              contentStyle={avatar.style}
              iconSized
            />
          ) : null
        }
      />
    )}
  />
)
