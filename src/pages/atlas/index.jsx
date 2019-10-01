import React, { PureComponent } from 'react'
import OpenLayers from '../../modules/open-layers'
import debounce from '../../lib/debounce'
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
      siteSearchTerm: ''
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
        features: this.getClusteredData(this.props.sites)
      })
    })

    this.clusteredSites = new VectorLayer({
      source: this.clusteredSitesSource,
      style: function(feature) {
        var size = feature.get('features').length
        return new Style({
          image: new CircleStyle({
            radius: size > 300 ? 50 : size > 250 ? 45 : size > 200 ? 40 : size > 100 ? 30 : size > 50 ? 25 : size > 20 ? 20 : 15,
            stroke: new Stroke({
              color: '#fff'
            }),
            fill: new Fill({
              color: 'rgba(51, 153, 204, 0.5)'
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

  getClusteredData = sites => {
    const { siteSearchTerm } = this.state
    return sites
      .map(site => {
        if (site.name.toUpperCase().indexOf(siteSearchTerm.toUpperCase()) < 0) {
          return null
        } else {
          const xyz = JSON.parse(site.xyz).coordinates
          return new Feature(new Point([xyz[0], xyz[1]]))
        }
      })
      .filter(_ => _)
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

  searchSites = val => {
    this.setState(
      { siteSearchTerm: val },
      debounce(() => {
        this.clusteredSitesSource.source.clear()
        this.clusteredSitesSource.getSource().addFeatures(this.getClusteredData(this.props.sites))
      })
    )
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
          style={{ zIndex: 999, opacity: 0.85, minWidth: '400px', paddingRight: '30px' }}
          id="simple-drawer-example"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={menuOpen}
          position={'right'}
          onVisibilityChange={this.handleVisibility}
          navItems={[
            <TextField
              autocomplete="off"
              key={'site-search'}
              style={{ margin: '0 20px', width: '100%' }}
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

        <Button style={{ position: 'absolute', top: 10, right: 10 }} icon onClick={this.openDrawer}>
          menu
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
