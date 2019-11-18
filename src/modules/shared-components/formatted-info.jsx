import React from 'react'

export const FormattedInfo = ({ object }) => (
  <>
    {Object.keys(object).map(key => (
      <p key={key}>
        <b>{key}</b> {object[key]}
      </p>
    ))}
  </>
)
