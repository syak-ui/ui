'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

export function SearchCommand() {
  return (
    <button className="flex items-center justify-between w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md text-slate-500 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-64">
      <span className="text-left">Search documentation...</span>
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}
