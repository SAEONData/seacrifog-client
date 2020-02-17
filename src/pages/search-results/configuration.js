import { IcosMetadataRecordView, SaeonMetadataRecordView } from './metadata-record-view'
import saeonLogo from '../../../public/saeon-logo.png'
import icosLogo from '../../../public/icos-logo.png'

export default {
  'ICOS Metadata Results': {
    logo: icosLogo,
    component: IcosMetadataRecordView,
    titlePath: [],
    explorerUriBase: '',
    explorerUri: []
  },
  'SAEON CKAN: saeon-odp-4-2': {
    logo: saeonLogo,
    component: SaeonMetadataRecordView,
    titlePath: ['metadata_json', 'titles', 0, 'title'],
    explorerUriBase: 'http://www.sasdi.net/metaview.aspx?uuid=',
    explorerUri: ['metadata_json', 'alternateIdentifiers', 0, 'alternateIdentifier']
  }
}
