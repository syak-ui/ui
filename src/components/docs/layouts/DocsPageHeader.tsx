import React from 'react'

interface DocsPageHeaderProps {
  title: string
  description: string
  visual?: React.ReactNode
}

export function DocsPageHeader({
  title,
  description,
  visual,
}: DocsPageHeaderProps) {
  return (
    <div className="relative mb-12 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-transparent" />
      <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
        {description}
      </p>
      {visual && <div className="mt-8">{visual}</div>}
    </div>
  )
}
