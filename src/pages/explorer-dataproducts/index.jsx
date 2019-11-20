import React from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStateContext } from '../../global-state'
import DataQuery from '../../modules/data-query'
import { DATAPRODUCTS_MIN, DATAPRODUCT } from '../../graphql/queries'
import {
  NoneMessage,
  FormattedInfo,
  ExplorerHeader,
  ExplorerLayout,
  ExplorerTableLayout,
  ExplorerTabsLayout,
  ExplorerEntityLayout,
  ExplorerAttributeLayout
} from '../../modules/shared-components'
import formatAndFilterObjectKeys from '../../lib/format-filter-obj-keys'
import { FontIcon, Button, Avatar, List, ListItem } from 'react-md'
import { mergeLeft } from 'ramda'
import { Table } from '../../modules/shared-components'

const mappings = []
const dataproductsDataDefinitions = {}

export default props => {
  const history = useHistory()
  return (
    <GlobalStateContext.Consumer>{({ selectedDataproducts, updateDataproducts }) => 'hi'}</GlobalStateContext.Consumer>
  )
}
