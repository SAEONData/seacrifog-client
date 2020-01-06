import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

export const pointLayer = ({ style, points }) =>
  new VectorLayer({
    source: new VectorSource({
      features: points.map(
        p =>
          new Feature({
            geometry: new Point(JSON.parse(p.xyz).coordinates),
            ...p
          })
      ),
      wrapX: false
    }),
    style: style()
  })
