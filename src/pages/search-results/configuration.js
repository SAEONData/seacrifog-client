import React from 'react'
import saeonLogo from '../../../public/saeon-logo.png'
import icosLogo from '../../../public/icos-logo.png'
import FormatSaeonRecord from './record-formats/saeon'
import FormatIcosRecord from './record-formats/icos'

export default {
  'ICOS Metadata Results': {
    logo: icosLogo,
    titlePath: ['fileName', 'value'],
    explorerUriBase: '',
    explorerUri: ['dobj', 'value'],
    contentPath: [],
    FormatContent: ({ content = null }) => <FormatIcosRecord content={content} />
  },
  'SAEON CKAN: saeon-odp-4-2': {
    logo: saeonLogo,
    titlePath: ['metadata_json', 'titles', 0, 'title'],
    explorerUriBase: 'http://www.sasdi.net/metaview.aspx?uuid=',
    explorerUri: ['metadata_json', 'alternateIdentifiers', 0, 'alternateIdentifier'],
    contentPath: ['metadata_json'],
    FormatContent: ({ content = null }) => <FormatSaeonRecord content={content} />
  }
}
