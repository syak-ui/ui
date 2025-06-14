'use client'

import * as React from 'react'
import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

interface DocsPagePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  title?: string
  description?: string
  code: string
  children: React.ReactNode
}

export function DocsPagePreview({
  name,
  title,
  description,
  code,
  children,
  className,
  ...props
}: DocsPagePreviewProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 space-y-4" {...props}>
      {title && (
        <div>
          <h3 className="text-xl font-semibold tracking-tight font-heading scroll-m-20">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-end">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
        <div className="relative mt-2">
          <TabsContent value="preview">
            <div className="flex items-center justify-center p-8 border rounded-lg">
              {children}
            </div>
          </TabsContent>
          <TabsContent value="code">
            <div className="relative p-4 font-mono text-sm rounded-lg bg-muted">
              <Button
                variant="ghost"
                size="icon"
                className="absolute w-8 h-8 top-2 right-2"
                onClick={handleCopy}
              >
                <Copy className="w-4 h-4" />
                <span className="sr-only">Copy</span>
              </Button>
              <pre className="overflow-x-auto">{code.trim()}</pre>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
