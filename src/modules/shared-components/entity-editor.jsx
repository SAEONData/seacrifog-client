import React from 'react'
import { TextField, DatePicker } from 'react-md'

const fieldStyle = {
  marginBottom: '7px'
}

const updateFormHelper = ({ fieldDefinitions, fieldName, val, updateForm }) =>
  updateForm({ [fieldName]: val }, () => (fieldDefinitions[fieldName].pristine = false))

export default ({ mutation, executeMutation, fieldDefinitions, entityProp, updateForm, ...fields }) => (
  <>
    {Object.entries(fieldDefinitions)
      .filter(([, { display }]) => display)
      .map(([fieldName, { type, label, editable }], i) =>
        type === 'String' ? (
          <TextField
            id={'update-form-entity' + i}
            key={i}
            rows={1}
            maxRows={15}
            floating
            style={fieldStyle}
            label={label}
            disabled={!editable}
            value={fields[fieldName] || ''}
            onChange={val => updateFormHelper({ fieldDefinitions, fieldName, val, updateForm })}
          />
        ) : type === 'Date' ? (
          <DatePicker
            id={'update-form-entity' + i}
            key={i}
            style={fieldStyle}
            label={label}
            formatOptions={{ year: 'numeric', month: 'numeric', day: 'numeric' }}
            value={fields[fieldName] || ''}
            disabled={!editable}
            onChange={val => updateFormHelper({ fieldDefinitions, fieldName, val, updateForm })}
          />
        ) : type === 'Integer' ? (
          <TextField
            id={'update-form-entity' + i}
            key={i}
            floating
            type={'number'}
            style={fieldStyle}
            label={label}
            disabled={!editable}
            value={fields[fieldName] || 0}
            onChange={val => updateFormHelper({ fieldDefinitions, fieldName, val: parseInt(val), updateForm })}
          />
        ) : type === 'Float' ? (
          <TextField
            id={'update-form-entity' + i}
            key={i}
            floating
            type={'number'}
            step={'.000000000000001'}
            style={fieldStyle}
            label={label}
            disabled={!editable}
            value={fields[fieldName] || 0}
            onChange={val => updateFormHelper({ fieldDefinitions, fieldName, val: parseFloat(val), updateForm })}
          />
        ) : (
          <p style={{ marginTop: '15px', color: 'red' }}>{fieldName} data type not supported!</p>
        )
      )}
  </>
)
