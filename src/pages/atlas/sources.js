import { Cluster, Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

export const cluster = data =>
  new Cluster({
    distance: 100,
    source: new VectorSource({
      features: data.map(site => {
        const xyz = JSON.parse(site.xyz).coordinates
        return new Feature(new Point([xyz[0], xyz[1]]))
      })
    })
  })
