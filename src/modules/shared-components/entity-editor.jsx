import React from 'react'
import { CardText, TextField, DatePicker } from 'react-md'

//TO-DO:

///Consult with Zach/Other:

//Done alone:
//-->Single quotes ' within a String input of the edit form cause an error unless 2 single quotes are provided ''. This might mean that SQL Injection is possible. Confirm it is not!
//-->visual bug where TextField divider isn't being shown sometimes. Caused by flex-box styling
//-->protocols paper first paragraph speaks about charts. Look into how to use apache eChart
//-->Change seacrifog-api Date.js back to returning a Date instead of a String AND change environment timezone: https://dev.to/kelkes/running-node-in-utc-instead-of-local-timezone-3gki
//-->Empty Dates are getting a value of "Thu Jan 01 1970" if save clicked
//-->Seacrifog-api rebuilds postgres db from seacrifog-old.
//Within seacrifog-api/src/db/sql/migration/schema.sql is the datatypes(float4, float8, etc) of each entity property.
//These can be changed to increase/decrease precision. Float4=8 digits. Float8=15 digits
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
              formatOptions={{ year: 'numeric', month: 'numeric', day: 'numeric' }}
              value={value != null ? value : ''}
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
              value={value != null ? value : ''} //NOTE: This could cause null values to be saved as "" if editor is opened and saved and these values are not handled
              onChange={val => {
                const validationResult = fieldDefinitions[key].validate(val, fieldDefinitions[key].precision)
                console.log(validationResult)
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
