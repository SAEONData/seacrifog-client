import React, { PureComponent } from 'react'
import OpenLayers from '../../modules/open-layers'
import UI from './ui'
import { clusterData, clusterLayer } from './clusters'
import debounce from '../../lib/debounce'

export default class extends PureComponent {
  state = {
    filters: [
      {
        id: 'site-name',
        label: 'Search sites',
        value: '',
        placeholder: 'by name',
        field: 'name'
      }
    ]
  }

  constructor(props) {
    super(props)
    this.clusteredSites = clusterData(this.props.data.sites)
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites)
  }

  filter = filter =>
    this.setState(
      { filters: this.state.filters.map(f => (f.id === filter.id ? filter : Object.assign({}, f))) },
      debounce(() =>
        this.clusteredSitesLayer.setSource(
          clusterData(
            this.props.data.sites.filter(site => {
              return true
            })
          )
        )
      )
    )

  render() {
    const { clusteredSitesLayer, filter } = this
    const { filters } = this.state
    return (
      <UI filter={filter} filters={filters}>
        <OpenLayers
          viewOptions={{
            zoom: 3
          }}
          layers={[clusteredSitesLayer]}
        />
      </UI>
    )
  }
}
