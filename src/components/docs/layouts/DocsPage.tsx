import React from 'react'

interface DocsPageProps {
  children: React.ReactNode
  toc: React.ReactNode
}

export function DocsPage({ children, toc }: DocsPageProps) {
  return (
    <div className="pt-10 xl:grid xl:grid-cols-[1fr_240px] xl:gap-12">
      <main className="flex flex-col min-w-0 gap-12">{children}</main>
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto xl:sticky xl:block">
        {toc}
      </aside>
    </div>
  )
}
