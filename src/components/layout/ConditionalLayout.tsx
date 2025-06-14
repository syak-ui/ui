'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => (
  <aside className="fixed top-14 z-30 h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:w-56 border-r">
    <div className="h-full p-6">
      <nav className="flex flex-col space-y-2">
        <h4 className="mb-2 font-bold">Components</h4>
        {/* MVP 10개 컴포넌트 (하드코딩) */}
        <Link
          href="/components/button"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Button
        </Link>
        <Link
          href="/components/input"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Input
        </Link>
        <Link
          href="/components/label"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Label
        </Link>
        <Link
          href="/components/card"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Card
        </Link>
        <Link
          href="/components/dialog"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Dialog
        </Link>
        <Link
          href="/components/checkbox"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Checkbox
        </Link>
        <Link
          href="/components/switch"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Switch
        </Link>
        <Link
          href="/components/alert"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Alert
        </Link>
        <Link
          href="/components/alert-dialog"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Alert Dialog
        </Link>
        <Link
          href="/components/avatar"
          className="text-sm text-slate-700 hover:text-slate-950"
        >
          Avatar
        </Link>
      </nav>
    </div>
  </aside>
)

const ConditionalSidebar = () => {
  const pathname = usePathname()

  // /docs 또는 /components 경로에서만 사이드바 표시
  const shouldShowSidebar = pathname.startsWith('/components')

  return shouldShowSidebar ? <Sidebar /> : null
}

export const ConditionalLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  // /docs 또는 /components 경로에서만 사이드바와 그리드 레이아웃 적용
  const shouldShowSidebar = pathname.startsWith('/components')

  if (shouldShowSidebar) {
    return (
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <ConditionalSidebar />
        <main className="relative py-6 lg:py-8">{children}</main>
      </div>
    )
  }

  return <main className="container py-6 lg:py-8">{children}</main>
}
