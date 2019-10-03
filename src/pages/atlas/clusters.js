import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'
import { Vector as VectorLayer } from 'ol/layer.js'
import { Cluster, Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

export const clusterData = data =>
  new Cluster({
    distance: 100,
    source: new VectorSource({
      features: data.map(site => {
        const xyz = JSON.parse(site.xyz).coordinates
        return new Feature(new Point([xyz[0], xyz[1]]))
      })
    })
  })

export const clusterLayer = source =>
  new VectorLayer({
    source,
    style: function(feature) {
      var size = feature.get('features').length
      return new Style({
        image: new CircleStyle({
          radius:
            size > 300
              ? 50
              : size > 250
              ? 45
              : size > 200
              ? 40
              : size > 100
              ? 30
              : size > 50
              ? 25
              : size > 20
              ? 20
              : 15,
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
