import React from 'react'

interface DocsPageProps {
  children: React.ReactNode
  toc?: React.ReactNode
}

export function DocsPage({ children, toc }: DocsPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="w-full min-w-0 mx-auto">{children}</div>

        {/* Table of Contents */}
        {toc && (
          <div className="hidden text-sm xl:block">
            <div className="sticky pt-4 -mt-10 top-16">{toc}</div>
          </div>
        )}
      </main>
    </div>
  )
}
