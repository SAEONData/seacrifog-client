import { VARIABLES_DOMAINS, VARIABLES_REQ_SOURCES, VARIABLES_RF_TYPES, VARIABLES_SETS } from '../../graphql/queries'

export const variableCharts = [
  {
    //Domains
    title: 'Domain Groupings',
    subtitle: 'based on selected Variables',
    query: VARIABLES_DOMAINS,
    queryVariable: 'variablesDomains',
    entryName: 'domain',
    entryValue: 'variable_count'
  },
  {
    //Req Sources
    title: 'Req Sources',
    subtitle: 'based on selected Variables',
    query: VARIABLES_REQ_SOURCES,
    queryVariable: 'variablesReqSources',
    entryName: 'req_source',
    entryValue: 'variable_count'
  },
  {
    //Rf Types
    title: 'Rf Types',
    subtitle: 'based on selected Variables',
    query: VARIABLES_RF_TYPES,
    queryVariable: 'variablesRfTypes',
    entryName: 'rftype',
    entryValue: 'variable_count'
  },
  {
    //Sets
    title: 'Set Groupings',
    subtitle: 'based on selected Variables',
    query: VARIABLES_SETS,
    queryVariable: 'variablesSets',
    entryName: 'set',
    entryValue: 'variable_count'
  }
]
