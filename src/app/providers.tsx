'use client'

import { usePathname } from 'next/navigation'
import { LayoutProvider, useLayout } from '@/contexts/LayoutContext'
import { ThemeProvider } from '@/provider/ThemeProvider'

import { cn } from '@/lib/utils'
import DocsLayout from '@/components/docs/layouts/DocsLayout'
import { Header } from '@/components/layout/Header/Header'

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isFullScreen } = useLayout()
  const isDocsPage = pathname.startsWith('/components')

  return (
    <div className={cn('container', isFullScreen && 'max-w-none px-8')}>
      {isDocsPage ? (
        <DocsLayout>{children}</DocsLayout>
      ) : (
        <main>{children}</main>
      )}
    </div>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LayoutProvider>
        <Header />
        <AppContent>{children}</AppContent>
      </LayoutProvider>
    </ThemeProvider>
  )
}
