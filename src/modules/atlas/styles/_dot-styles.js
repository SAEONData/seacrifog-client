import { Fill, Style, Circle as CircleStyle } from 'ol/style.js'

export const dotStyle1 = () =>
  new Style({
    image: new CircleStyle({
      radius: 1,
      fill: new Fill({ color: '#212b61' }),
      stroke: null
    })
  })
