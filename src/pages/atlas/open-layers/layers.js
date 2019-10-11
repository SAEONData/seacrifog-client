import { Vector as VectorLayer } from 'ol/layer.js'
import { Tile as TileLayer } from 'ol/layer.js'
import TileWMS from 'ol/source/TileWMS'
import { clusterStyle } from './styles'

export const ahocevarBaseMap = new TileLayer({
  source: new TileWMS({
    url: 'https://ahocevar.com/geoserver/wms',
    params: {
      LAYERS: 'ne:NE1_HR_LC_SR_W_DR',
      TILED: true
    }
  })
})

export const clusterLayer = source =>
  new VectorLayer({
    source,
    style: clusterStyle
  })
