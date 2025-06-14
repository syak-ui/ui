import React from 'react'

interface DocsPageSectionProps {
  id?: string
  title: string
  children: React.ReactNode
  className?: string
}

export function DocsPageSection({
  id,
  title,
  children,
  className,
}: DocsPageSectionProps) {
  return (
    <div className={`space-y-6 ${className || ''}`}>
      <div>
        <h2
          id={id}
          className="pb-2 mt-12 text-2xl font-semibold tracking-tight border-b font-heading scroll-m-20 first:mt-0"
        >
          {title}
        </h2>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  )
}
