import React from 'react'
import { CardText, TextField, DatePicker } from 'react-md'

//TO-DO:

///Consult with Zach/Other:
//-->Postgres DB uses float4 and int4 data types. This means a precision of 8 digits. GraphQL seems to allow a precision of 6 digits.

//Done alone:
//--> Graphiql (localhost://3000) shows updateDataproduct input for publish date as being a string. seacrifog-api shows it as being a Date.
//strugglig to get any form of input to not throw an apollo error 500 when mutating this date.
//-->if a new column(e.g. author, date published, title, etc) is added to the DB, an error will be thrown by the filters. This is because the entry is not found in our explicit fieldDefinitions.
//create a popup alert / admin alert system to notify a dev to add the definition to fieldDefinitions and ignore that field for the sake of the user
//-->Read up on IIFE((immediately invoking function expression)
//-->Comment throughout fieldDefinitions and save-button
//--> confirm if user windows date format impacts react-md date picker value format
//-->Add toast/snackbar to save button
//-->ProgresIndicator turning Green on completion
//-->Read Protocols paper https://www.seacrifog.eu/fileadmin/seacrifog/Deliverables/Lopez-Ballesteros_et_al._2019_SEACRIFOG_D4.3_doi.pdf
//-->Look into if it possible to use GraphQL to query the postgres DB in order to fill out some fieldDefinitions properties dynamically(like type)

export default ({ mutation, executeMutation, fieldDefinitions, entityProp, updateForm, ...fields }) => (
  <CardText>
    {Object.entries(fields)
      .filter(([field]) => {
        return fieldDefinitions[field].display
      }) //removing any unwanted columns
      .map(([key, value], i) => {
        if (fieldDefinitions[key].type === String)
          return (
            <TextField
              id={'update-form-entity' + i}
              key={i}
              rows={1}
              maxRows={15}
              floating
              style={{ marginBottom: '7px' }}
              label={fieldDefinitions[key].label}
              disabled={!fieldDefinitions[key].editable}
              value={value != null ? value : ''} //NOTE: This can cause null values to be saved as "" if editor is opened and saved
              onChange={val => updateForm({ [key]: val })} //no validation needed
            />
          )
        else if (fieldDefinitions[key].type === Date) {
          return (
            <DatePicker
              id={'update-form-entity' + i}
              key={i}
              style={{ marginBottom: '7px' }}
              label={fieldDefinitions[key].label}
              value={value != null ? value.substring(0, 10) : ''}
              disabled={!fieldDefinitions[key].editable}
              onChange={val => {
                updateForm({ [key]: val })
              }}
            />
          )
        } else if (fieldDefinitions[key].type === Number)
          return (
            <TextField
              id={'update-form-entity' + i}
              key={i}
              floating
              style={{ marginBottom: '7px' }}
              label={fieldDefinitions[key].label}
              disabled={!fieldDefinitions[key].editable}
              helpText={
                fieldDefinitions[key].editable ? (fieldDefinitions[key].isFloat ? 'Rational Number' : 'Integer') : ''
              }
              value={value != null ? value : undefined} //NOTE: This can cause null values to be saved as "" if editor is opened and saved
              onChange={val => {
                const validationResult = fieldDefinitions[key].validate(val, fieldDefinitions[key].precision)
                if (validationResult[0] === true) updateForm({ [key]: validationResult[1] })
                else {
                  //do nothing
                }
              }}
            />
          )
        else {
          return <p style={{ marginTop: '15px', color: 'red' }}>{key} data type not supported!</p>
        }
      })}
  </CardText>
)
