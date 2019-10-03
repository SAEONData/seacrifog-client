import React, { PureComponent } from 'react'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { Cluster, Vector as VectorSource } from 'ol/source'
import TileWMS from 'ol/source/TileWMS'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'

export default class extends PureComponent {
  getClusteredSites = sites =>
    sites.map(site => {
      const xyz = JSON.parse(site.xyz).coordinates
      return new Feature(new Point([xyz[0], xyz[1]]))
    })

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

    this.clusteredSites = new Cluster({
      distance: 100,
      source: new VectorSource({
        features: this.getClusteredSites(this.props.sites)
      })
    })

    this.clusteredSitesLayer = new VectorLayer({
      source: this.clusteredSites,
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
  render() {
    const { baseMap, clusteredSites, clusteredSitesLayer } = this
    return <>{this.props.children({ baseMap, clusteredSites, clusteredSitesLayer })}</>
  }
}
