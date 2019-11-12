import reactLogo from './svgs/react-logo.svg'
import googleLogo from './svgs/google-logo.svg'
import gitlabLogo from './svgs/gitlab-logo.svg'

const avatarStyle = { fontSize: '11px' }

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
    icon: 'contact_support'
  },
  { keyval: 'nav-divider-explore', divider: true, style: {} },
  {
    keyval: 'nav-item-explorer-variables',
    exact: false,
    label: 'Variables',
    to: '/variables',
    avatar: { children: 'V', suffix: 'light-blue', style: avatarStyle }
  },
  {
    keyval: 'nav-item-explorer-protocols',
    exact: false,
    label: 'Protocols',
    to: '/protocols',
    avatar: { children: 'P', suffix: 'cyan', style: avatarStyle }
  },
  {
    keyval: 'nav-item-explorer-networks',
    exact: false,
    label: 'Networks',
    to: '/networks',
    avatar: { children: 'N', suffix: 'teal', style: avatarStyle }
  },
  {
    keyval: 'nav-item-explorer-dataproducts',
    exact: false,
    label: 'Data Products',
    to: '/dataproducts',
    avatar: { children: 'D', suffix: 'light-green', style: avatarStyle }
  },
  {
    keyval: 'nav-item-atlas',
    exact: true,
    label: 'Sites',
    to: '/sites',
    avatar: { children: 'S', suffix: 'lime', style: avatarStyle }
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
    avatar: {
      children: 'MD',
      suffix: 'deep-orange',
      style: Object.assign({ ...avatarStyle }, { color: 'white', backgroundColor: '#ff6e40', fontSize: '9px' })
    },
    label: 'React-md'
  },
  {
    keyval: 'google-logo',
    href: 'https://www.google.com/design/spec/material-design/introduction.html',
    avatar: { src: googleLogo, alt: 'Google Logo', className: 'md-avatar__google-logo' },
    label: 'Material Design'
  }
]
