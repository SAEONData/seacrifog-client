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
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      siteSearchTerm: '',
      sites: this.getClusteredData(this.props.sites)
    }

    this.baseMap = new TileLayer({
      source: new TileWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: {
          LAYERS: 'ne:NE1_HR_LC_SR_W_DR',
          TILED: true
        }
      })
    })

    this.clusteredSitesSource = new Cluster({
      distance: 100,
      source: new VectorSource({
        features: this.state.sites
      })
    })

    this.clusteredSites = new VectorLayer({
      source: this.clusteredSitesSource,
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
  }

  getClusteredData = sites =>
    sites.map(site => {
      const xyz = JSON.parse(site.xyz).coordinates
      return new Feature(new Point([xyz[0], xyz[1]]))
    })

  openDrawer = () => {
    this.setState({ menuOpen: true })
  }

  closeDrawer = () => {
    this.setState({ menuOpen: false })
  }

  handleVisibility = menuOpen => {
    this.setState({ menuOpen })
  }

  searchSites = val => {
    // https://stackoverflow.com/questions/50967221/openlayers-how-to-refresh-cluster
    const sites = this.getClusteredData([])
    this.setState({ siteSearchTerm: val, sites }, () => {
      this.clusteredSitesSource.source.clear()
      this.clusteredSitesSource.getSource().addFeatures(sites)
    })
  }

  render() {
    const { menuOpen, siteSearchTerm } = this.state
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
            <TextField
              key={'site-search'}
              style={{ margin: '0 20px', width: '200px' }}
              id="atlas-search-field"
              label="Search sites"
              placeholder="(site name)"
              value={siteSearchTerm}
              onChange={val => this.searchSites(val)}
              leftIcon={<FontIcon>search</FontIcon>}
              fullWidth={true}
            />
          ]}
          header={<Toolbar nav={closeBtn} className="md-divider-border md-divider-border--bottom" />}
        />

        <OpenLayers
          viewOptions={{
            zoom: 3
          }}
          layers={[this.baseMap, this.clusteredSites]}
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
