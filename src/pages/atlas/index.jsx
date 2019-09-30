import React, { PureComponent } from 'react'
import OpenLayers from '../../modules/open-layers'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { Cluster, Vector as VectorSource } from 'ol/source'
// import { OSM, Vector as VectorSource } from 'ol/source'
import TileWMS from 'ol/source/TileWMS'
import DataQuery from '../../modules/data-query'
import { SITES } from '../../graphql/queries'
import { Button, Drawer, Toolbar, FontIcon, TextField } from 'react-md'

// For clustering
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'

class Atlas extends PureComponent {
  state = { menuOpen: false }

  constructor(props) {
    super(props)

    this.layers = [
      new TileLayer({
        source: new TileWMS({
          url: 'https://ahocevar.com/geoserver/wms',
          params: {
            LAYERS: 'ne:NE1_HR_LC_SR_W_DR',
            TILED: true
          }
        })
      }),
      new VectorLayer({
        source: new Cluster({
          distance: 100,
          source: new VectorSource({
            features: this.props.sites.map(site => {
              const xyz = JSON.parse(site.xyz).coordinates
              return new Feature(new Point([xyz[0], xyz[1]]))
            })
          })
        }),
        style: function(feature) {
          var size = feature.get('features').length
          return new Style({
            image: new CircleStyle({
              radius: size > 200 ? 40 : size > 100 ? 30 : size > 20 ? 20 : 15,
              stroke: new Stroke({
                color: '#fff'
              }),
              fill: new Fill({
                color: '#3399CC'
              })
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff'
              })
            })
          })
        }
      })
    ]
  }

  openDrawer = () => {
    this.setState({ menuOpen: true })
  }

  closeDrawer = () => {
    this.setState({ menuOpen: false })
  }

  handleVisibility = menuOpen => {
    this.setState({ menuOpen })
  }

  render() {
    const { menuOpen } = this.state
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
          visible={menuOpen}
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

export default () => (
  <DataQuery query={SITES} variables={{}}>
    {props => <Atlas {...props} />}
  </DataQuery>
)
