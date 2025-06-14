import React from 'react'
import { ChevronRight } from 'lucide-react'

import { Separator } from '@/components/ui/Separator'

interface DocsPageHeaderProps {
  title: string
  description: string
  breadcrumb?: string
  badges?: { label: string; variant?: 'default' | 'secondary' }[]
}

export function DocsPageHeader({
  title,
  description,
  breadcrumb = '문서',
  badges = [{ label: 'v1.0.0', variant: 'secondary' }, { label: 'Radix UI' }],
}: DocsPageHeaderProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center mb-4 space-x-1 text-sm text-muted-foreground">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {breadcrumb}
        </div>
        <ChevronRight className="w-4 h-4" />
        <div className="font-medium text-foreground">{title}</div>
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight scroll-m-20">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground">{description}</p>
      </div>

      {/* Badges */}
      <div className="flex items-center pt-4 space-x-2">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              badge.variant === 'secondary'
                ? 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
                : 'bg-background text-foreground'
            }`}
          >
            {badge.label}
          </div>
        ))}
      </div>

      <Separator className="my-6" />
    </>
  )
}
