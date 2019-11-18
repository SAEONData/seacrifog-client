import { validate, validateInt, validateFloat } from '../../lib/validations'

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
  title: {
    type: String,
    editable: true,
    display: true,
    label: 'Title',
    pristine: true,
    validate
  },
  publish_year: {
    type: Number, //int
    isFloat: false,
    editable: true,
    display: true,
    label: 'Year Published',
    pristine: true,
    validate: validateInt
  },
  publish_date: {
    type: Date,
    editable: false,
    display: true,
    label: 'Date Published',
    pristine: true,
    validate
  },
  keywords: {
    type: String,
    editable: true,
    display: true,
    label: 'Keywords',
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
  provider: {
    type: String,
    editable: true,
    display: true,
    label: 'Provider',
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
  contact: {
    type: String,
    editable: true,
    display: true,
    label: 'Contact',
    pristine: true,
    validate
  },
  coverage_spatial: {
    type: JSON,
    editable: false,
    display: false,
    label: 'Spatial Coverage',
    pristine: true,
    validate
  },
  coverage_temp_start: {
    type: Date,
    editable: false,
    display: true,
    label: 'Temperature Coverage Start Date',
    pristine: true,
    validate
  },
  coverage_temp_end: {
    type: Date,
    editable: false,
    display: true,
    label: 'Temperature Coverage End Date',
    pristine: true,
    validate
  },
  res_spatial: {
    type: Number, //Float
    isFloat: true,
    editable: true,
    display: true,
    label: 'Spatial Resolution',
    pristine: true,
    validate: validateFloat
  },
  res_spatial_unit: {
    type: String,
    editable: true,
    display: true,
    label: 'Spatial Resolution Unit',
    pristine: true,
    validate
  },
  res_temperature: {
    type: Number, //Float
    isFloat: true,
    editable: false,
    display: false,
    label: ' Temperature Resolution',
    pristine: true,
    validate: validateFloat
  },
  res_temperature_unit: {
    type: String,
    editable: true,
    display: true,
    label: 'Temperature Resolution Unit',
    pristine: true,
    validate
  },
  uncertainty: {
    type: Number, //Float
    isFloat: true,
    editable: false,
    display: false,
    label: 'Uncertainty',
    pristine: true,
    validate: validateFloat
  },
  uncertainty_unit: {
    type: String,
    editable: true,
    display: true,
    label: 'Uncertainty Unit',
    pristine: true,
    validate
  },
  doi: {
    type: String,
    editable: true,
    display: true,
    label: 'Digital Object Identifier (DOI)',
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
  url_download: {
    type: String,
    editable: true,
    display: true,
    label: 'Download URL',
    pristine: true,
    validate
  },
  file_format: {
    type: String,
    editable: true,
    display: true,
    label: 'File Format',
    pristine: true,
    validate
  },
  file_size: {
    type: Number, //Float
    isFloat: true,
    editable: false,
    display: false,
    label: 'File Size',
    pristine: true,
    validate: validateFloat
  },
  file_size_unit: {
    type: String,
    editable: true,
    display: true,
    label: 'File Size Unit',
    pristine: true,
    validate
  },
  url_info: {
    type: String,
    editable: true,
    display: true,
    label: 'URL Information',
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
    editable: false,
    display: false,
    label: 'Date Created',
    pristine: true,
    validate
  },
  modified_by: {
    type: String,
    editable: true,
    display: true,
    label: 'Modified By',
    pristine: true,
    validate
  },
  modified_at: {
    type: Date,
    editable: false,
    display: false,
    label: 'Date Modified',
    pristine: true,
    validate
  },
  present: {
    type: String,
    editable: true,
    display: true,
    label: 'Present',
    pristine: true,
    validate
  },
  variables: {
    type: [], //[Variable]
    editable: false,
    display: false,
    label: 'Variables',
    pristine: true,
    validate
  }
}
