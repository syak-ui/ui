export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type SidebarNavItem = NavItem & {
  items: NavItem[]
}

export const docsConfig: { sidebarNav: SidebarNavItem[] } = {
  sidebarNav: [
    {
      title: 'Components',
      href: '/components',
      items: [
        { title: 'Alert', href: '/components/alert' },
        { title: 'Alert Dialog', href: '/components/alert-dialog' },
        { title: 'Avatar', href: '/components/avatar' },
        { title: 'Button', href: '/components/button' },
        { title: 'Card', href: '/components/card' },
        { title: 'Checkbox', href: '/components/checkbox' },
        { title: 'Dialog', href: '/components/dialog' },
        { title: 'Input', href: '/components/input' },
        { title: 'Label', href: '/components/label' },
        { title: 'Switch', href: '/components/switch' },
      ],
    },
    // 추후 'Getting Started' 등 다른 섹션 추가
  ],
}
