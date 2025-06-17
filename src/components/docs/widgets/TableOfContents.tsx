'use client'

import React, { useMemo } from 'react'

import { cn } from '@/lib/utils'
import { useTocObserver } from '@/hooks/useTocObserver'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const itemIds = useMemo(() => items.map((item) => item.id), [items])

  const activeId = useTocObserver(itemIds)

  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto  md:sticky md:block">
      <div className="sticky top-0 p-4 space-y-4 rounded-lg bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-primary to-primary/60" />

          <h3 className="text-sm font-semibold text-foreground">목차</h3>
        </div>

        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={cn(
                  'group relative flex items-center py-2 px-3 text-sm transition-all duration-200 rounded-md',

                  'hover:bg-accent/50 hover:text-foreground',

                  'focus:outline-none focus:ring-2 focus:ring-primary/20',

                  item.id === activeId
                    ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                    : 'text-muted-foreground border-l-2 border-transparent'
                )}
                style={{
                  marginLeft: `${(item.level - 1) * 0.75}rem`,

                  paddingLeft: `${Math.max(0.75, 0.75 - (item.level - 1) * 0.25)}rem`,
                }}
              >
                <span className="relative z-10 leading-relaxed line-clamp-2">
                  {item.title}
                </span>

                {item.id === activeId && (
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-primary to-primary/60 rounded-full" />
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
