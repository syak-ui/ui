'use client'

import React, { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

import { CodeBlock } from '../ui/CodeBlock'
import {
  DocsTabs,
  DocsTabsContent,
  DocsTabsList,
  DocsTabsTrigger,
} from '../ui/DocsTabs'

interface CodePreviewProps {
  title?: string
  description?: string
  children?: React.ReactNode
  code: string
  lang?: 'tsx' | 'bash'
  className?: string
}

export function CodePreview({
  title,
  description,
  children,
  code,
  lang = 'tsx',
  className = '',
}: CodePreviewProps) {
  const [highlightedCode, setHighlightedCode] = useState<{
    light: string
    dark: string
  } | null>(null)

  useEffect(() => {
    let isMounted = true
    const highlight = async () => {
      try {
        const [light, dark] = await Promise.all([
          codeToHtml(code, {
            lang,
            theme: 'github-light',
          }),
          codeToHtml(code, {
            lang,
            theme: 'github-dark-default',
          }),
        ])
        if (isMounted) {
          setHighlightedCode({ light, dark })
        }
      } catch (error) {
        console.error('Error highlighting code:', error)
      }
    }
    highlight()
    return () => {
      isMounted = false
    }
  }, [code, lang])

  return (
    <div className={`my-6 space-y-2 ${className}`}>
      {/* 제목과 설명 */}
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}

      {!children ? (
        highlightedCode ? (
          <CodeBlock
            rawCode={code}
            lightCode={highlightedCode.light}
            darkCode={highlightedCode.dark}
          />
        ) : (
          <div className="h-48 rounded-lg bg-muted animate-pulse" />
        )
      ) : (
        // children이 있으면 탭 시스템을 렌더링합니다.
        <DocsTabs defaultValue="preview" className="w-full">
          <div className="flex justify-end">
            <DocsTabsList>
              <DocsTabsTrigger value="preview">Preview</DocsTabsTrigger>
              <DocsTabsTrigger value="code">Code</DocsTabsTrigger>
            </DocsTabsList>
          </div>

          {/* 미리보기 탭 패널 */}
          <DocsTabsContent value="preview" className="mt-2">
            <div className="flex items-center justify-center p-8 border rounded-lg min-h-[450px]">
              {children}
            </div>
          </DocsTabsContent>

          {/* 코드 탭 패널 */}
          <DocsTabsContent value="code" className="mt-2">
            {highlightedCode ? (
              <CodeBlock
                rawCode={code}
                lightCode={highlightedCode.light}
                darkCode={highlightedCode.dark}
              />
            ) : (
              <div className="rounded-lg h-96 bg-muted animate-pulse" />
            )}
          </DocsTabsContent>
        </DocsTabs>
      )}
    </div>
  )
}
