export default [
  {
    keyval: 'nav-drawer-subheader-overview',
    subheader: true,
    primaryText: 'Tool Overview'
  },
  {
    keyval: 'nav-item-home',
    exact: true,
    label: 'Home',
    to: '/',
    icon: 'home'
  },
  {
    keyval: 'nav-item-about',
    exact: true,
    label: 'About',
    to: '/about',
    icon: 'info'
  },
  {
    keyval: 'nav-item-contact',
    exact: true,
    label: 'Contact',
    to: '/contact',
    icon: 'contact_support'
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
  },
  {
    keyval: 'nav-item-data-explorer',
    exact: true,
    label: 'Explorer',
    to: '/data-explorer',
    icon: 'explore'
  }
]
