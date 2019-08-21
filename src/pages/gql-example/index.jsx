import React from 'react'
import QueryRenderer from '../../modules/query-renderer'
import { VARIABLES } from '../../graphql/queries'
import {
  Grid,
  Cell,
  DropdownMenu,
  ListItem,
  FontIcon,
  TextField,
  Card,
  CardTitle,
  CardText
} from 'react-md'

// eslint-disable-next-line no-extend-native
String.prototype.truncate = function(length, ending) {
  length = length || 100
  ending = ending || '...'
  if (this.length > length)
    return this.substring(0, length - ending.length) + ending
  else return this
}

export default () => (
  <QueryRenderer query={VARIABLES}>
    {data => (
      <Grid>
        <Cell size={6} tabletSize={8} phoneSize={6}>
          <Card>
            <CardTitle
              title="GQL Usage examples"
              subtitle="Testing using API data with GQL components"
            />
            <CardText>
              <DropdownMenu
                style={{ width: '100%' }}
                id="variable-search"
                menuItems={data.variables.map(v => (
                  <ListItem
                    leftAvatar={<FontIcon>chevron_right</FontIcon>}
                    primaryText={v.name}
                    secondaryText={v.description}
                    threeLines
                  />
                ))}
                anchor={{
                  x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
                  y: DropdownMenu.VerticalAnchors.BOTTOM
                }}
                position={DropdownMenu.Positions.BELOW}
              >
                <TextField
                  id="search-variables-text"
                  label="Search"
                  autoComplete="off"
                  value={''}
                  placeholder="Search variables by anything"
                  onChange={val => console.log('hi')}
                />
              </DropdownMenu>
            </CardText>
          </Card>
        </Cell>
      </Grid>
    )}
  </QueryRenderer>
)
