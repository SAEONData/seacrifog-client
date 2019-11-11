//The fields to be displayed but as disabled(greyed out)
const noneditableFields = ['ID', 'UPDATED_BY', 'UPDATED_AT']
//The fields NOT to be displayed at all
const hiddenFields = [
  'INDIRECTLY_RELATED_PROTOCOLS',
  'DIRECTLY_RELATED_PROTOCOLS',
  'RFORCINGS',
  'DATAPRODUCTS',
  '__TYPENAME'
]

// const errorFields = [
//   'INDIRECTLY_RELATED_PROTOCOLS',
//   'DIRECTLY_RELATED_PROTOCOLS',
//   'RFORCINGS',
//   'DATAPRODUCTS',
//   '__TYPENAME'
// updated_at

// ]
const validate = (arg1, arg2) => 'todo'

export const fieldDefinitions = {
  __typename: {
    //consider removing this entry and filtering out __typename from fields instead
    type: String,
    editable: false,
    display: false,
    label: '__typename',
    pristine: false,
    validate
  },
  id: {
    type: Number, //int
    editable: false,
    display: false,
    label: 'Variable ID',
    pristine: true,
    validate
  },
  name: {
    type: String,
    editable: true,
    display: true,
    label: 'Name',
    pristine: true,
    validate
  },
  class: {
    type: String,
    editable: true,
    display: true,
    label: 'Class',
    pristine: true,
    validate
  },
  domain: {
    type: String,
    editable: true,
    display: true,
    label: 'Domain',
    pristine: true,
    validate
  },
  set: {
    type: String,
    editable: true,
    display: true,
    label: 'Set',
    pristine: true,
    validate
  },
  description: {
    type: String,
    editable: true,
    display: true,
    label: 'Description',
    pristine: true,
    validate
  },
  method: {
    type: String,
    editable: true,
    display: true,
    label: 'Method',
    pristine: true,
    validate
  },
  uri: {
    type: String,
    editable: true,
    display: true,
    label: 'Uniform Resource Identifier (URI)',
    pristine: true,
    validate
  },
  rftype: {
    type: String,
    editable: true,
    display: true,
    label: 'RF Type',
    pristine: true,
    validate
  },
  score: {
    type: Number, //int
    editable: false,
    display: false,
    label: 'Score',
    pristine: true,
    validate
  },
  rating: {
    type: Number, //int
    editable: false,
    display: false,
    label: 'Rating',
    pristine: true,
    validate
  },
  relevance: {
    type: Number, //Float
    editable: false,
    display: false,
    label: 'Relevance',
    pristine: true,
    validate
  },
  feasibility: {
    type: Number, //Float
    editable: false,
    display: false,
    label: 'Feasibility',
    pristine: true,
    validate
  },
  cost: {
    type: Number, //Float
    editable: false,
    display: false,
    label: 'Cost',
    pristine: true,
    validate
  },
  updated_by: {
    type: String,
    editable: true,
    display: true,
    label: 'Updated By',
    pristine: true,
    validate
  },
  updated_at: {
    type: Date,
    editable: true,
    display: false,
    label: 'Updated At',
    pristine: true,
    validate
  },
  frequency_value: {
    type: Number, //Float
    editable: false,
    display: false,
    label: 'Frequency Value',
    pristine: true,
    validate
  },
  frequency_unit: {
    type: String,
    editable: true,
    display: true,
    label: 'Frequency Unit',
    pristine: true,
    validate
  },
  frequency_comment: {
    type: String,
    editable: true,
    display: true,
    label: 'Frequency Comment',
    pristine: true,
    validate
  },
  res_value: {
    type: Number, //Float
    editable: false,
    display: false,
    label: 'Resolution Value',
    pristine: true,
    validate
  },
  res_unit: {
    type: String,
    editable: true,
    display: true,
    label: 'Resolution Unit',
    pristine: true,
    validate
  },
  res_comment: {
    type: String,
    editable: true,
    display: true,
    label: 'Resolution Comment',
    pristine: true,
    validate
  },
  unc_val: {
    type: Number, //Float
    editable: true,
    display: false,
    label: 'Uncertainty Value',
    pristine: true,
    validate
  },
  unc_unit: {
    type: String,
    editable: true,
    display: true,
    label: 'Uncertainty Unit',
    pristine: true,
    validate
  },
  unc_comment: {
    type: String,
    editable: true,
    display: true,
    label: 'Uncertainty Comment',
    pristine: true,
    validate
  },
  req_source: {
    type: String,
    editable: true,
    display: true,
    label: '***req=Request?*** Source',
    pristine: true,
    validate
  },
  req_uri: {
    type: String,
    editable: true,
    display: true,
    label: '***req=Request?*** Uniform Resource Identifier (URI)',
    pristine: true,
    validate
  },
  technology_type: {
    type: String,
    editable: true,
    display: true,
    label: 'Technology Type',
    pristine: true,
    validate
  },
  dataproducts: {
    type: [], //[Dataproduct]
    editable: false,
    display: false,
    label: 'Dataproducts',
    pristine: true,
    validate
  },
  directly_related_protocols: {
    type: [], //[Protocol]
    editable: false,
    display: false,
    label: 'Directly Related Protocols',
    pristine: true,
    validate
  },
  indirectly_related_protocols: {
    type: [], //[Protocol]
    editable: false,
    display: false,
    label: 'Indirectly Related Protocols',
    pristine: true,
    validate
  },
  rforcings: {
    type: [], //[RadiativeForcing]
    editable: false,
    display: false,
    label: 'Radiative Forcings',
    pristine: true,
    validate
  }
}
