import React, { Component } from 'react'
import AccountMenu from './account-menu'
import { Badge, Button } from 'react-md'

class SubNav extends Component {
  render() {
    return (
      <>
        <ul className="subnav">
          <li className="subnav-parent">
            <Badge badgeContent={12} primary badgeId="notifications-1">
              <Button icon>notifications</Button>
            </Badge>
          </li>
          <li className="subnav-parent">
            <AccountMenu />
          </li>
        </ul>
      </>
    )
  }
}

export default SubNav
