import {
  VARIABLES_DOMAINS,
  VARIABLES_RF_TYPES,
  VARIABLES_PROTOCOLS,
  VARIABLES_RFORCING_COMPOUNDS
} from '../../graphql/queries'

export const variableCharts = [
  {
    //Domains
    title: 'Domain Groupings',
    query: VARIABLES_DOMAINS,
    queryVariable: 'variablesDomains',
    entryName: 'domain',
    entryValue: 'variable_count'
  },
  {
    //Rf Types
    title: 'Rf Types',
    query: VARIABLES_RF_TYPES,
    queryVariable: 'variablesRfTypes',
    entryName: 'rftype',
    entryValue: 'variable_count'
  },
  {
    //Protocol Count
    title: 'Related Protocol Count',
    query: VARIABLES_PROTOCOLS,
    queryVariable: 'variablesProtocols',
    entryName: 'variable_name',
    entryValue: 'protocol_count'
  },
  {
    //Associated RF Compound Count
    title: 'Associated Radiative Forcing Compounds',
    query: VARIABLES_RFORCING_COMPOUNDS,
    queryVariable: 'variablesRforcingCompounds',
    entryName: 'variable_name',
    entryValue: 'rforcing_count'
  }
]
