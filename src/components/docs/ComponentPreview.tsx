'use client'

import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { CodeBlock } from './CodeBlock'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  name?: string
}

export function ComponentPreview({
  children,
  code,
  name = 'component-preview',
}: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="preview">미리보기</TabsTrigger>
        <TabsTrigger value="code">코드</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="space-y-4">
        <div className="flex items-center justify-center p-6 border rounded-lg bg-background min-h-[200px]">
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code" className="space-y-4">
        <CodeBlock code={code} language="tsx" />
      </TabsContent>
    </Tabs>
  )
}
