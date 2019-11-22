export const fieldDefinitions = {
  __typename: {
    //consider removing this entry and filtering out __typename from fields instead
    type: 'String',
    editable: false,
    display: false,
    label: '__typename',
    pristine: true
  },
  id: {
    type: 'Integer',
    precision: 8,
    editable: false,
    display: false,
    label: 'Variable ID',
    pristine: true
  },
  name: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Name',
    pristine: true
  },
  class: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Class',
    pristine: true
  },
  domain: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Domain',
    pristine: true
  },
  set: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Set',
    pristine: true
  },
  description: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Description',
    pristine: true
  },
  method: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Method',
    pristine: true
  },
  uri: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Uniform Resource Identifier (URI)',
    pristine: true
  },
  rftype: {
    type: 'String',
    editable: true,
    display: true,
    label: 'RF Type',
    pristine: true
  },
  score: {
    type: 'Integer',
    precision: 8,
    editable: false,
    display: false,
    label: 'Score',
    pristine: true
  },
  rating: {
    type: 'Integer',
    precision: 8,
    editable: true,
    display: true,
    label: 'Rating',
    pristine: true
  },
  relevance: {
    type: 'Float',
    precision: 8,
    isFloat: true,
    editable: true,
    display: true,
    label: 'Relevance',
    pristine: true
  },
  feasibility: {
    type: 'Float',
    precision: 8,
    isFloat: true,
    editable: true,
    display: true,
    label: 'Feasibility',
    pristine: true
  },
  cost: {
    type: 'Float',
    precision: 8,
    isFloat: true,
    editable: true,
    display: false,
    label: 'Cost',
    pristine: true
  },
  updated_by: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Updated By',
    pristine: true
  },
  updated_at: {
    type: 'Date',
    editable: true,
    display: true,
    label: 'Updated At',
    pristine: true
  },
  frequency_value: {
    type: 'Float',
    precision: 8,
    isFloat: true,
    editable: true,
    display: false,
    label: 'Frequency Value',
    pristine: true
  },
  frequency_unit: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Frequency Unit',
    pristine: true
  },
  frequency_comment: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Frequency Comment',
    pristine: true
  },
  res_value: {
    type: 'Float',
    precision: 8,
    isFloat: true,
    editable: true,
    display: false,
    label: 'Resolution Value',
    pristine: true
  },
  res_unit: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Resolution Unit',
    pristine: true
  },
  res_comment: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Resolution Comment',
    pristine: true
  },
  unc_val: {
    type: 'Float',
    precision: 8,
    isFloat: true,
    editable: true,
    display: false,
    label: 'Uncertainty Value',
    pristine: true
  },
  unc_unit: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Uncertainty Unit',
    pristine: true
  },
  unc_comment: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Uncertainty Comment',
    pristine: true
  },
  req_source: {
    type: 'String',
    editable: true,
    display: true,
    label: '***req=Request?*** Source',
    pristine: true
  },
  req_uri: {
    type: 'String',
    editable: true,
    display: true,
    label: '***req=Request?*** Uniform Resource Identifier (URI)',
    pristine: true
  },
  technology_type: {
    type: 'String',
    editable: true,
    display: true,
    label: 'Technology Type',
    pristine: true
  }
}
