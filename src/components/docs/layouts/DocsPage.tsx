import React from 'react'

interface DocsPageProps {
  children: React.ReactNode
  toc: React.ReactNode
}

export function DocsPage({ children, toc }: DocsPageProps) {
  return (
    <div className="md:grid md:grid-cols-[1fr_240px] md:gap-8 lg:gap-12">
      <main className="flex flex-col min-w-0">{children}</main>
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-l py-6 pr-2 md:sticky md:block lg:py-8">
        {toc}
      </aside>
    </div>
  )
}
