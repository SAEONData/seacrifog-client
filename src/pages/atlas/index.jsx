import React, { PureComponent } from 'react'
import OpenLayers from '../../modules/open-layers'
import { Tile as TileLayer } from 'ol/layer.js'
import { OSM } from 'ol/source'
import { Button, Drawer, Toolbar, FontIcon } from 'react-md'

export default class extends PureComponent {
  state = { visible: false }

  constructor(props) {
    super(props)
    this.layers = [
      new TileLayer({
        source: new OSM({})
      })
    ]
  }

  openDrawer = () => {
    this.setState({ visible: true })
  }

  closeDrawer = () => {
    this.setState({ visible: false })
  }

  handleVisibility = visible => {
    this.setState({ visible })
  }

  render() {
    const { visible } = this.state
    const closeBtn = (
      <Button icon onClick={this.closeDrawer}>
        close
      </Button>
    )

    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <Drawer
          style={{ zIndex: 999 }}
          id="simple-drawer-example"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          position={'right'}
          onVisibilityChange={this.handleVisibility}
          navItems={[
            {
              key: 'inbox',
              primaryText: 'Inbox',
              leftIcon: <FontIcon>inbox</FontIcon>,
              active: true
            },
            {
              key: 'starred',
              primaryText: 'Starred',
              leftIcon: <FontIcon>star</FontIcon>
            },
            {
              key: 'send-mail',
              primaryText: 'Send mail',
              leftIcon: <FontIcon>send</FontIcon>
            },
            {
              key: 'drafts',
              primaryText: 'Drafts',
              leftIcon: <FontIcon>drafts</FontIcon>
            },
            { key: 'divider', divider: true },
            {
              key: 'all-mail',
              primaryText: 'All mail',
              leftIcon: <FontIcon>mail</FontIcon>
            },
            {
              key: 'trash',
              primaryText: 'Trash',
              leftIcon: <FontIcon>delete</FontIcon>
            },
            {
              key: 'spam',
              primaryText: 'Spam',
              leftIcon: <FontIcon>info</FontIcon>
            }
          ]}
          header={<Toolbar nav={closeBtn} className="md-divider-border md-divider-border--bottom" />}
        />

        <OpenLayers
          viewOptions={{
            zoom: 3
          }}
          layers={this.layers}
        />

        <Button style={{ position: 'absolute', top: 10, right: 10 }} raised onClick={this.openDrawer}>
          Menu
        </Button>
      </div>
    )
  }
}
