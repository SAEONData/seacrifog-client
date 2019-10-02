import React, { PureComponent } from 'react'
import OpenLayers from '../../modules/open-layers'
import debounce from '../../lib/debounce'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { Cluster, Vector as VectorSource } from 'ol/source'
import TileWMS from 'ol/source/TileWMS'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'
import { Button, Drawer, Toolbar, TextField, Autocomplete } from 'react-md'

export default class extends PureComponent {
  state = {
    menuOpen: false,
    siteSearchTerm: '',
    variableSearchTerm: ''
  }

  constructor(props) {
    super(props)

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
        if (site.name.toUpperCase().indexOf((siteSearchTerm || '').toUpperCase()) < 0) {
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

  searchSites = ({ siteSearchTerm }) => {
    this.setState(
      { siteSearchTerm },
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
          style={{ zIndex: 999, minWidth: '400px' }}
          navStyle={{ paddingLeft: '30px', paddingRight: '30px' }}
          id="atlas-menu"
          visible={menuOpen}
          mobileType={Drawer.DrawerTypes.TEMPORARY}
          tabletType={Drawer.DrawerTypes.TEMPORARY}
          desktopType={Drawer.DrawerTypes.TEMPORARY}
          position={'right'}
          onVisibilityChange={this.handleVisibility}
          navItems={[
            <TextField
              autoComplete="off"
              key={'site-search'}
              style={{ width: '100%' }}
              id="atlas-search-field-sites"
              label="Search sites"
              placeholder="(by name)"
              value={siteSearchTerm}
              onChange={val => this.searchSites({ siteSearchTerm: val })}
              fullWidth={true}
            />,
            <Autocomplete
              key={'variable-search'}
              type="search"
              id="atlas-search-field-variables"
              label="Search variables"
              placeholder="(by name)"
              data={['hello', 'world']}
              filter={Autocomplete.fuzzyFilter}
            />,
            <Autocomplete
              key={'protocol-search'}
              type="search"
              id="atlas-search-field-protocols"
              label="Search protocols"
              placeholder="(by name)"
              data={['hello', 'world']}
              filter={Autocomplete.fuzzyFilter}
            />
          ]}
          header={<Toolbar nav={closeBtn} />}
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
