import React from 'react'
import { CardText, TextField /* DatePicker*/ } from 'react-md'
import SaveButton from '../../modules/shared-components/save-button'

//TO-DO:
//->Move DataQuery from entity-editor to editor-variables, editor-protocol, editor-dataproducts so that DataQuery can have 2 children trees(entity editor and relationship editor)
//Relationship Editor will be very explicit unlike entity-editor so its best have them as separate components.
//->if a column is added to the DB, an error will be thrown by the filters. This is because the entry is not found in our explicit fieldDefinitions.
//create a popup alert / admin alert system to notify a dev to add the definition to fieldDefinitions and ignore that field for the sake of the user
//->Make Save Button more responsive. Maybe a swipe on save, scroll to top, progress bar
//->Read up on IIFE((immediately invoking function expression)
//->Check in with Zach if Save Button needs any unmount functionality

//--->Data Type Handling Changes:
//->Date : DatePicker
//->Number : TextField with error checker
//->Text : Simple TextField

export default ({ mutation, executeMutation, fieldDefinitions, entityProp, updateForm, ...fields }) => (
  <CardText>
    {Object.entries(fields)
      .filter(([field]) => {
        return fieldDefinitions[field].display
      }) //removing any unwanted columns
      .map(([key, value], i) => {
        //if (fieldDefinitions[key].type === String)
        return (
          <TextField
            id={'update-form-entity' + i}
            key={i}
            label={fieldDefinitions[key].label}
            disabled={!fieldDefinitions[key].editable}
            value={value != null ? value.toString() : ''} //NOTE: This can cause null values to be saved as "" if editor is opened and saved
            onChange={val => updateForm({ [key]: val })}
          />
        )
        /*else if (fieldDefinitions[key].type === Date) {
                        return (
                          <DatePicker
                            id={'update-form-entity' + i}
                            key={i}
                            label={fieldDefinitions[key].label}
                            value={value}
                            disabled={!fieldDefinitions[key].editable}
                            onChange={val => updateForm({ [key]: val })}
                          />
                        )
                      } else {
                        return ''
                      }*/
      })}
    <SaveButton
      onClick={executeMutation}
      onClickProps
      fields={fields}
      fieldDefinitions={fieldDefinitions}
      linear={false}
      circular={true}
    />
  </CardText>
)
