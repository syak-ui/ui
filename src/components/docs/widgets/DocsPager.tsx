'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type SidebarNavItem } from '@/constants/docs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

interface DocsPagerProps {
  toc: SidebarNavItem[]
}

export function DocsPager({ toc }: DocsPagerProps) {
  const pathname = usePathname()

  // 중첩된 toc 배열을 하나의 플랫한 배열로 만듭니다.
  const flattenedLinks = toc.flatMap((section) => section.items || [])

  // 현재 페이지의 인덱스를 찾습니다.
  const activeIndex = flattenedLinks.findIndex((link) => link.href === pathname)

  // 이전 페이지와 다음 페이지 링크를 결정합니다.
  const prevLink = activeIndex > 0 ? flattenedLinks[activeIndex - 1] : null
  const nextLink =
    activeIndex < flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null

  return (
    <div className="flex gap-2">
      {/* 이전 페이지 링크 */}
      {prevLink ? (
        <Link
          href={prevLink.href}
          className={cn(
            'flex items-center gap-1 px-3 py-2 text-sm border rounded-md hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <ChevronLeft className="w-3 h-3" />
          <span className="truncate max-w-[120px]">{prevLink.title}</span>
        </Link>
      ) : null}

      {/* 다음 페이지 링크 */}
      {nextLink ? (
        <Link
          href={nextLink.href}
          className={cn(
            'flex items-center gap-1 px-3 py-2 text-sm border rounded-md hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <span className="truncate max-w-[120px]">{nextLink.title}</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      ) : null}
    </div>
  )
}
