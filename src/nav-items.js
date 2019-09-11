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
    exact: false,
    label: 'Variables',
    to: '/variables',
    icon: 'code'
  },
  {
    keyval: 'nav-item-explorer-protocols',
    exact: false,
    label: 'Protocols',
    to: '/protocols',
    icon: 'scatter_plot'
  },
  {
    keyval: 'nav-item-explorer-dataproducts',
    exact: false,
    label: 'Data-products',
    to: '/dataproducts',
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
    label: 'Finder',
    to: '/graph',
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
