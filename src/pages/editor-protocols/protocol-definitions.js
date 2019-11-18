import { validate, validateInt } from '../../lib/validations'

export const fieldDefinitions = {
  __typename: {
    //consider removing this entry and filtering out __typename from fields instead
    type: Number, //int
    isFloat: false,
    editable: false,
    display: false,
    label: '__typename',
    pristine: false,
    validate: validateInt
  },
  id: {
    type: Number, //int
    isFloat: false,
    editable: false,
    display: true,
    label: 'Dataproduct ID',
    pristine: true,
    validate: validateInt
  },
  doi: {
    type: String,
    editable: true,
    display: true,
    label: 'Digital Object Identifier',
    pristine: true,
    validate
  },
  author: {
    type: String,
    editable: true,
    display: true,
    label: 'Author',
    pristine: true,
    validate
  },
  publisher: {
    type: String,
    editable: true,
    display: true,
    label: 'Publisher',
    pristine: true,
    validate
  },
  title: {
    type: String,
    editable: true,
    display: true,
    label: 'Title',
    pristine: true,
    validate
  },
  publish_date: {
    //should be date?
    type: String,
    editable: true,
    display: true,
    label: 'Date Published',
    pristine: true,
    validate
  },
  publish_year: {
    //should be int?
    type: String,
    editable: true,
    display: true,
    label: 'Year Published',
    pristine: true,
    validate
  },
  coverage_type: {
    type: String,
    editable: true,
    display: true,
    label: 'Type of Coverage',
    pristine: true,
    validate
  },
  category: {
    type: String,
    editable: true,
    display: true,
    label: 'Category',
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
  purpose: {
    type: String,
    editable: true,
    display: true,
    label: 'Purpose',
    pristine: true,
    validate
  },
  abstract: {
    type: String,
    editable: true,
    display: true,
    label: 'Abstract',
    pristine: true,
    validate
  },
  license: {
    type: String,
    editable: true,
    display: true,
    label: 'License',
    pristine: true,
    validate
  },
  language: {
    type: String,
    editable: true,
    display: true,
    label: 'Language',
    pristine: true,
    validate
  },
  format: {
    type: String,
    editable: true,
    display: true,
    label: 'Format',
    pristine: true,
    validate
  },
  sustainability: {
    type: String,
    editable: true,
    display: true,
    label: 'Sustainability',
    pristine: true,
    validate
  },
  version: {
    type: String,
    editable: true,
    display: true,
    label: 'Version',
    pristine: true,
    validate
  },
  resolution: {
    type: String,
    editable: true,
    display: true,
    label: 'Resolution',
    pristine: true,
    validate
  },
  cost: {
    type: String,
    editable: true,
    display: true,
    label: 'Cost',
    pristine: true,
    validate
  },
  source: {
    type: String,
    editable: true,
    display: true,
    label: 'Source',
    pristine: true,
    validate
  },
  created_by: {
    type: String,
    editable: true,
    display: true,
    label: 'Created By',
    pristine: true,
    validate
  },
  created_at: {
    type: Date,
    editable: true,
    display: false,
    label: 'Created At',
    pristine: true,
    validate
  },
  edited_by: {
    type: String,
    editable: true,
    display: true,
    label: 'Edited By',
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
  directly_related_variables: {
    type: [], //[Variable]
    editable: true,
    display: false,
    label: 'Author',
    pristine: true,
    validate
  },
  indirectly_related_variables: {
    type: [], //[Variable]
    editable: true,
    display: false,
    label: 'Author',
    pristine: true,
    validate
  }
}
