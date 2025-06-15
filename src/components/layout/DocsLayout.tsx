'use client'

import { docsConfig } from '@/constants/docs'

import { SidebarNav } from '@/components/layout/SidebarNav'

interface DocsLayoutProps {
  children: React.ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="md:grid md:grid-cols-[220px_1fr] md:gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-8">
        <SidebarNav items={docsConfig.sidebarNav} />
      </aside>
      <main className="flex flex-col min-w-0 py-6 lg:py-8">{children}</main>
    </div>
  )
}
