import { SITES_AGGREGATION, NETWORKS_TYPES } from '../../graphql/queries'

export const networkCharts = [
  {
    //Site Count
    title: 'Site Count',
    subtitle: 'of selected Networks',
    chartType: 'pie',
    query: SITES_AGGREGATION,
    queryVariable: 'sitesAggregation',
    entryName: 'acronym',
    entryValue: 'site_count'
  },
  {
    //Network Type Distribution
    title: 'Network Type Distribution',
    subtitle: 'of selected Networks',
    chartType: 'pie',
    query: NETWORKS_TYPES,
    queryVariable: 'networksTypes',
    entryName: 'type',
    entryValue: 'network_count'
  }
  //   {
  //     //Site Count DUPLICATE FOR DEMO PURPOSE
  //     title: 'Site Count',
  //     subtitle: 'of selected Networks',
  //     chartType: 'pie',
  //     query: SITES_AGGREGATION,
  //     queryVariable: 'sitesAggregation',
  //     entryName: 'acronym',
  //     entryValue: 'site_count'
  //   },
  //   {
  //     //Site Count
  //     title: 'Site Count',
  //     subtitle: 'of selected Networks',
  //     chartType: 'bar',
  //     query: SITES_AGGREGATION,
  //     queryVariable: 'sitesAggregation',
  //     entryName: 'acronym',
  //     entryValue: 'site_count'
  //   },
  //   {
  //     //Network Type Distribution DUPLICATE
  //     title: 'Network Type Distribution',
  //     subtitle: 'of selected Networks',
  //     chartType: 'bar',
  //     query: NETWORKS_TYPES,
  //     queryVariable: 'networksTypes',
  //     entryName: 'type',
  //     entryValue: 'network_count'
  //   },
  //   {
  //     //Site Count DUPLICATE FOR DEMO PURPOSE
  //     title: 'Site Count',
  //     subtitle: 'of selected Networks',
  //     chartType: 'bar',
  //     query: SITES_AGGREGATION,
  //     queryVariable: 'sitesAggregation',
  //     entryName: 'acronym',
  //     entryValue: 'site_count'
  //   }
]
