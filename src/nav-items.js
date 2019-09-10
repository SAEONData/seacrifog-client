export default [
  {
    keyval: 'nav-item-home',
    exact: true,
    label: 'Home',
    to: '/',
    icon: 'home'
  },
  {
    keyval: 'nav-item-contact',
    exact: true,
    label: 'Contact',
    to: '/contact',
    icon: 'call'
  },
  { keyval: 'nav-divider-explore', divider: true, style: {} },
  {
    keyval: 'nav-drawer-subheader-explore',
    subheader: true,
    primaryText: 'Explore'
  },
  {
    keyval: 'nav-item-explorer-variables',
    exact: true,
    label: 'Variables',
    to: '/explore/variables',
    icon: 'code'
  },
  {
    keyval: 'nav-item-explorer-protocols',
    exact: true,
    label: 'Protocols',
    to: '/explore/protocols',
    icon: 'scatter_plot'
  },
  {
    keyval: 'nav-item-explorer-dataproducts',
    exact: true,
    label: 'Data-products',
    to: '/explore/dataproducts',
    icon: 'shopping_cart'
  },
  { keyval: 'nav-divider-tools', divider: true, style: {} },
  {
    keyval: 'nav-drawer-subheader-tools',
    subheader: true,
    primaryText: 'Tools'
  },
  {
    keyval: 'nav-item-dashboard',
    exact: true,
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'dashboard'
  },
  {
    keyval: 'nav-item-data-selector',
    exact: true,
    label: 'Data Selector',
    to: '/selector',
    icon: 'search'
  },
  {
    keyval: 'nav-item-atlas',
    exact: true,
    label: 'Atlas',
    to: '/atlas',
    icon: 'location_searching'
  }
]
