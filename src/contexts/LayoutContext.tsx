'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'

interface LayoutContextType {
  isFullScreen: boolean
  toggleFullScreen: () => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev)
  }

  const value = useMemo(
    () => ({ isFullScreen, toggleFullScreen }),
    [isFullScreen]
  )

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
