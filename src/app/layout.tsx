import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '쌱-UI - 당신의 UI 개발, 이제 쌱- 하고 끝내세요',
  description:
    '대한민국 모든 개발자가 UI 걱정 없이, 쌱-하고 빠르게 핵심에 집중하도록. 토스 스타일 UI 컴포넌트 라이브러리.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
