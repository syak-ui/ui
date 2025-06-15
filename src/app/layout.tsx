'use client'

import './globals.css'

import { Inter, JetBrains_Mono } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { LayoutProvider, useLayout } from '@/contexts/LayoutContext'

import { cn } from '@/lib/utils'
import { DocsLayout } from '@/components/layout/DocsLayout'
import { Header } from '@/components/layout/Header'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          jetbrainsMono.variable
        )}
      >
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
      </body>
    </html>
  )
}
