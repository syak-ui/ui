// src/components/docs/CodePreview.tsx (최종 리팩토링)
import React from 'react'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { codeToHtml } from 'shiki'

import { transformerLineNumbers } from '@/lib/shiki-transformers/transformerLineNumbers'

import { CodeBlock } from './CodeBlock' // 클라이언트 컴포넌트
import {
  DocsTabs,
  DocsTabsContent,
  DocsTabsList,
  DocsTabsTrigger,
} from './DocsTabs'

interface CodePreviewProps {
  title?: string
  description?: string
  children?: React.ReactNode
  code: string
  lang?: 'tsx' | 'bash'
  className?: string
}

export async function CodePreview({
  title,
  description,
  children,
  code,
  lang = 'tsx',
  className = '',
}: CodePreviewProps) {
  const highlightedCode = await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'monokai',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerLineNumbers(),
    ],
  })

  return (
    <div className={`my-6 space-y-2 ${className}`}>
      {/* 제목과 설명 */}
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}

      {!children ? (
        <CodeBlock rawCode={code} highlightedCode={highlightedCode} />
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
            <div className="flex items-center justify-center p-8 border rounded-lg min-h-[120px]">
              {children}
            </div>
          </DocsTabsContent>

          {/* 코드 탭 패널 */}
          <DocsTabsContent value="code" className="mt-2">
            <CodeBlock rawCode={code} highlightedCode={highlightedCode} />
          </DocsTabsContent>
        </DocsTabs>
      )}
    </div>
  )
}
