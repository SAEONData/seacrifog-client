import { PROTOCOLS_COVERAGES, PROTOCOLS_DOMAINS, PROTOCOLS_COVERAGE_TYPES } from '../../graphql/queries'

export const protocolCharts = [
  {
    //Protocol Coverages
    title: 'Coverage Groupings',
    subtitle: 'based on selected Protocols',
    query: PROTOCOLS_COVERAGES,
    queryVariable: 'protocolsCoverages',
    entryName: 'coverage',
    entryValue: 'protocol_count'
  },
  {
    //Protocol Coverage Types
    title: 'Coverage Type Groupings',
    subtitle: 'based on selected Protocols',
    query: PROTOCOLS_COVERAGE_TYPES,
    queryVariable: 'protocolsCoverageTypes',
    entryName: 'coverage_type',
    entryValue: 'protocol_count'
  },
  {
    //Protocol Domains
    title: 'Domain Groupings',
    subtitle: 'based on selected Protocols',
    query: PROTOCOLS_DOMAINS,
    queryVariable: 'protocolsDomains',
    entryName: 'domain',
    entryValue: 'protocol_count'
  }
]
