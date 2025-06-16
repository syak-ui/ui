'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type SidebarNavItem } from '@/constants/docs'

import { cn } from '@/lib/utils'

interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        return (
          <div key={index} className={cn('grid gap-1')}>
            <h4 className="px-2 py-1 text-sm font-bold rounded-md">
              {item.title}
            </h4>
            {item.items?.length && (
              <div className="grid gap-1">
                {item.items.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    href={child.href}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                      pathname === child.href
                        ? 'bg-accent font-semibold text-accent-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
