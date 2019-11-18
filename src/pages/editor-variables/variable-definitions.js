import { validate, validateInt, validateFloat } from '../../lib/validations'

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
    precision: 8,
    isFloat: false,
    editable: false,
    display: false,
    label: 'Variable ID',
    pristine: true,
    validate: validateInt
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
    precision: 8,
    isFloat: false,
    editable: false,
    display: false,
    label: 'Score',
    pristine: true,
    validate: validateInt
  },
  rating: {
    type: Number, //int
    precision: 8,
    isFloat: false,
    editable: true,
    display: true,
    label: 'Rating',
    pristine: true,
    validate: validateInt
  },
  relevance: {
    type: Number, //Float
    precision: 8,
    isFloat: true,
    editable: true,
    display: true,
    label: 'Relevance',
    pristine: true,
    validate: validateFloat
  },
  feasibility: {
    type: Number, //Float
    precision: 8,
    isFloat: true,
    editable: true,
    display: true,
    label: 'Feasibility',
    pristine: true,
    validate: validateFloat
  },
  cost: {
    type: Number, //Float
    precision: 8,
    isFloat: true,
    editable: true,
    display: false,
    label: 'Cost',
    pristine: true,
    validate: validateFloat
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
    precision: 8,
    isFloat: true,
    editable: true,
    display: false,
    label: 'Frequency Value',
    pristine: true,
    validate: validateFloat
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
    precision: 8,
    isFloat: true,
    editable: true,
    display: false,
    label: 'Resolution Value',
    pristine: true,
    validate: validateFloat
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
    precision: 8,
    isFloat: true,
    editable: true,
    display: false,
    label: 'Uncertainty Value',
    pristine: true,
    validate: validateFloat
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
