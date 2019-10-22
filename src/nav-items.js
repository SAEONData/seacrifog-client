import reactLogo from './svgs/react-logo.svg'
import reactMdLogo from './svgs/react-md-logo.svg'
import googleLogo from './svgs/google-logo.svg'
import gitlabLogo from './svgs/gitlab-logo.svg'

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
    label: 'Data Products',
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
    keyval: 'nav-item-atlas',
    exact: true,
    label: 'Atlas',
    to: '/atlas',
    icon: 'location_searching'
  },
  { keyval: 'nav-divider-tools', divider: true, style: {} },
  {
    keyval: 'nav-drawer-subheader-source',
    subheader: true,
    primaryText: 'References'
  },
  {
    keyval: 'source-code',
    href: 'https://gitlab.com/saeon/seacrifog',
    avatar: { src: gitlabLogo, alt: 'React Logo' },
    label: 'Source Code'
  },
  {
    keyval: 'react-logo',
    href: 'https://facebook.github.io/react/',
    avatar: { src: reactLogo, alt: 'GitLab Logo' },
    label: 'React'
  },
  {
    keyval: 'react-md-logo',
    href: 'https://react-md.mlaursen.com/',
    avatar: { src: reactMdLogo, alt: 'React-md Logo' },
    label: 'React-md'
  },
  {
    keyval: 'google-logo',
    href: 'https://www.google.com/design/spec/material-design/introduction.html',
    avatar: { src: googleLogo, alt: 'Google Logo', className: 'md-avatar__google-logo' },
    label: 'Material Design'
  }
]
