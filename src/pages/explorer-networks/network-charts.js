import { SITES_AGGREGATION, NETWORKS_TYPES } from '../../graphql/queries'

export const networkCharts = [
  {
    //Site Count
    title: 'Site Count',
    query: SITES_AGGREGATION,
    queryVariable: 'sitesAggregation',
    entryName: 'acronym',
    entryValue: 'site_count'
  },
  {
    //Network Type Distribution
    title: 'Network Type Distribution',
    query: NETWORKS_TYPES,
    queryVariable: 'networksTypes',
    entryName: 'type',
    entryValue: 'network_count'
  }
]
