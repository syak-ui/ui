'use client'

import React from 'react'

import { CodeBlock } from './CodeBlock'
import {
  DocsTabs,
  DocsTabsContent,
  DocsTabsList,
  DocsTabsTrigger,
} from './DocsTabs'

interface ExampleCardProps {
  title: string
  description?: string
  children: React.ReactNode
  code: string
  className?: string
}

export function ExampleCard({
  title,
  description,
  children,
  code,
  className = '',
}: ExampleCardProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <DocsTabs defaultValue="preview" className="w-full">
        <DocsTabsList className="grid w-full grid-cols-2">
          <DocsTabsTrigger value="preview">Preview</DocsTabsTrigger>
          <DocsTabsTrigger value="code">Code</DocsTabsTrigger>
        </DocsTabsList>

        <DocsTabsContent value="preview" className="mt-4">
          <div className="flex items-center justify-center p-6 border rounded-lg bg-background min-h-[120px]">
            {children}
          </div>
        </DocsTabsContent>

        <DocsTabsContent value="code" className="mt-4">
          <CodeBlock code={code} language="tsx" showLineNumbers={false} />
        </DocsTabsContent>
      </DocsTabs>
    </div>
  )
}
