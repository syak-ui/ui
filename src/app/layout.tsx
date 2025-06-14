import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ConditionalLayout } from '@/components/layout/ConditionalLayout'
import { Header } from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: '쌱-UI (syak-ui)',
  description: '대한민국 모든 개발자가 UI 걱정 없이, 쌱-하고 빠르게.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={twMerge(
          clsx(
            'min-h-screen bg-background font-sans antialiased',
            inter.variable
          )
        )}
      >
        <Header />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
