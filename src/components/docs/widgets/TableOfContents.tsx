'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const itemIds = useMemo(() => items.map((item) => item.id), [items])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    itemIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <p className="font-semibold">On This Page</p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'inline-block no-underline transition-colors hover:text-foreground',
                item.id === activeId
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground'
              )}
              style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
