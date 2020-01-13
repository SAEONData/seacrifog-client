import React from 'react'
import { Divider, Button } from 'react-md'

export default ({ searchResults }) => (
  <div>
    {searchResults
      .map(r => r.result.results)
      .flat()
      .map((rcrd, i) => (
        <div key={i}>
          <Button
            onClick={() =>
              window.open(
                `http://www.sasdi.net/metaview.aspx?uuid=${rcrd.metadata_json.alternateIdentifiers[0].alternateIdentifier}`,
                '_blank'
              )
            }
            primary
            swapTheming
            flat
            iconChildren={'visibility'}
          >
            View record
          </Button>
          <p
            style={{
              maxHeight: '300px',
              overflow: 'auto',
              padding: '15px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              backgroundColor: 'rgba(0,0,0,0.1)'
            }}
          >
            {JSON.stringify(rcrd, null, 2)}
          </p>
          <Divider style={{ margin: '20px' }} />
        </div>
      ))}
  </div>
)
