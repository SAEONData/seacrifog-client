import {
  PROTOCOLS_COVERAGES,
  PROTOCOLS_DOMAINS,
  PROTOCOLS_COVERAGE_TYPES,
  PROTOCOLS_VARIABLES
} from '../../graphql/queries'

export const protocolCharts = [
  {
    //Protocol Coverages
    title: 'Coverage Groupings',
    query: PROTOCOLS_COVERAGES,
    queryVariable: 'protocolsCoverages',
    entryName: 'coverage',
    entryValue: 'protocol_count'
  },
  {
    //Protocol Coverage Types
    title: 'Coverage Type Groupings',
    query: PROTOCOLS_COVERAGE_TYPES,
    queryVariable: 'protocolsCoverageTypes',
    entryName: 'coverage_type',
    entryValue: 'protocol_count'
  },
  {
    //Protocol Domains
    title: 'Domain Groupings',
    query: PROTOCOLS_DOMAINS,
    queryVariable: 'protocolsDomains',
    entryName: 'domain',
    entryValue: 'protocol_count'
  },
  {
    //Protocol Variables
    title: 'Related Variable Count',
    query: PROTOCOLS_VARIABLES,
    queryVariable: 'protocolsVariables',
    entryName: 'protocol_title',
    entryValue: 'variable_count'
  }
]
