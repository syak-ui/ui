'use client'

import Link from 'next/link'
import { useLayout } from '@/contexts/LayoutContext'
// Github 아이콘은 이제 GitHubStars 컴포넌트 내부에서 사용되므로 여기서 import 할 필요가 없습니다.
import { Expand, Shrink } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { GitHubStars } from '@/components/docs/widgets/GitHubStars'

import { MobileNav } from './MobileNav'
import { SearchCommand } from './SearchCommand'
import { ThemeToggle } from './ThemeToggle'

function FullScreenToggle() {
  const { isFullScreen, toggleFullScreen } = useLayout()

  return (
    <Button
      onClick={toggleFullScreen}
      variant="ghost"
      size="icon"
      className="hidden 2xl:inline-flex"
    >
      {isFullScreen ? (
        <Shrink className="w-4 h-4" />
      ) : (
        <Expand className="w-4 h-4" />
      )}
      <span className="sr-only">Toggle full screen</span>
    </Button>
  )
}

export function Header() {
  const { isFullScreen } = useLayout()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div
        className={cn(
          'container flex items-center justify-between h-14',
          isFullScreen && 'max-w-none px-8'
        )}
      >
        <div className="flex items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center mr-6 space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="flex-shrink-0 w-6 h-6"
            >
              <rect width="256" height="256" fill="none" />
              <path
                d="M88,56S168,48,192,128s-96,72-96,72"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <path
                d="M168,200S88,208,64,128s96-72,96-72"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span className="hidden font-bold sm:inline-block">쌱-UI</span>
          </Link>

          {/* 메인 네비게이션 (데스크탑) */}
          <nav className="items-center hidden gap-6 text-sm md:flex">
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Docs
            </Link>
            <Link
              href="/components"
              className="font-medium transition-colors hover:text-foreground/80 text-foreground"
            >
              Components
            </Link>
            <Link
              href="/blocks"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Blocks
            </Link>
            <Link
              href="/charts"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Charts
            </Link>
            <Link
              href="/themes"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Themes
            </Link>
            <Link
              href="/colors"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Colors
            </Link>
          </nav>
        </div>

        {/* 오른쪽: 검색 + 액션 버튼들 */}
        <div className="flex items-center gap-4">
          <div className="items-center hidden gap-2 md:flex">
            <SearchCommand />
            <GitHubStars />
          </div>
          <FullScreenToggle />
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
