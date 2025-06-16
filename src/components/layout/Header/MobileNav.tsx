'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { SearchCommand } from './SearchCommand'

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <>
      <Button variant="ghost" size="icon" onClick={toggleOpen}>
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-0 z-50 grid w-full gap-6 p-6 top-14 bg-background">
            <nav className="grid gap-4 text-sm">
              <Link href="/docs" className="text-muted-foreground">
                Docs
              </Link>
              <Link href="/components">Components</Link>
              <Link href="/blocks" className="text-muted-foreground">
                Blocks
              </Link>
              <Link href="/charts" className="text-muted-foreground">
                Charts
              </Link>
              <Link href="/themes" className="text-muted-foreground">
                Themes
              </Link>
              <Link href="/colors" className="text-muted-foreground">
                Colors
              </Link>
            </nav>
            <div className="mt-4">
              <SearchCommand />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
