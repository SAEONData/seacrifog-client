import React from 'react'

const pStyle = {
  wordBreak: 'break-all'
}

export const FormattedInfo = ({ object }) => (
  <>
    {Object.keys(object).map(key => (
      <p key={key} style={pStyle}>
        <b>{key}</b> {object[key]}
      </p>
    ))}
  </>
)
