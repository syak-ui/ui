'use client'

import React, { useEffect, useState } from 'react'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'
import { codeToHtml } from 'shiki'

import { Button } from '@/components/ui/Button'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  maxLines?: number
}

export function CodeBlock({
  code,
  language = 'typescript',
  title,
  showLineNumbers = true,
  maxLines = 8,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [html, setHtml] = useState<string>('')
  const [truncatedHtml, setTruncatedHtml] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')
  const shouldTruncate = lines.length > maxLines && !expanded
  const totalLines = lines.length

  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true)

        // 전체 코드 하이라이팅
        const fullHighlighted = await codeToHtml(code, {
          lang: language,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          transformers: showLineNumbers
            ? [
                {
                  name: 'line-numbers',
                  pre(node) {
                    this.addClassToHast(node, 'line-numbers')
                  },
                  line(node, line) {
                    node.properties['data-line'] = line
                  },
                },
              ]
            : [],
        })
        setHtml(fullHighlighted)

        // 축약된 코드 하이라이팅 (8줄까지만)
        if (lines.length > maxLines) {
          const truncatedCode = lines.slice(0, maxLines).join('\n')
          const truncatedHighlighted = await codeToHtml(truncatedCode, {
            lang: language,
            themes: {
              light: 'github-light',
              dark: 'github-dark',
            },
            transformers: showLineNumbers
              ? [
                  {
                    name: 'line-numbers',
                    pre(node) {
                      this.addClassToHast(node, 'line-numbers')
                    },
                    line(node, line) {
                      node.properties['data-line'] = line
                    },
                  },
                ]
              : [],
          })
          setTruncatedHtml(truncatedHighlighted)
        }
      } catch (error) {
        console.error('Code highlighting failed:', error)
        setHtml(`<pre><code>${code}</code></pre>`)
        setTruncatedHtml(
          `<pre><code>${lines.slice(0, maxLines).join('\n')}</code></pre>`
        )
      } finally {
        setIsLoading(false)
      }
    }

    highlightCode()
  }, [code, language, showLineNumbers, maxLines, lines])

  if (isLoading) {
    return (
      <div className="relative">
        {title && (
          <div className="flex items-center justify-between px-4 py-2 border border-b-0 rounded-t-lg bg-muted/50">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
          </div>
        )}
        <div className="flex items-center justify-center h-32 border rounded-b-lg bg-muted/50 animate-pulse">
          <div className="text-sm text-muted-foreground">
            코드 하이라이팅 중...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group">
      {/* 헤더 - 제목과 라인 수 정보 */}
      {(title || showLineNumbers) && (
        <div className="flex items-center justify-between px-4 py-2 border border-b-0 rounded-t-lg bg-muted/50">
          <span className="text-sm font-medium text-muted-foreground">
            {title || 'Code'}
          </span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{totalLines} lines</span>
            <span>•</span>
            <span>{language}</span>
          </div>
        </div>
      )}

      <div className="relative">
        {/* Shiki 하이라이팅된 코드 */}
        <div
          className={`shiki-container overflow-x-auto text-sm border ${title || showLineNumbers ? 'rounded-b-lg' : 'rounded-lg'} ${shouldTruncate ? 'relative' : ''}`}
          style={
            {
              '--shiki-light': '#1f2328',
              '--shiki-dark': '#e1e4e8',
              '--shiki-light-bg': '#f6f8fa',
              '--shiki-dark-bg': '#24292e',
            } as React.CSSProperties
          }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: shouldTruncate ? truncatedHtml : html,
            }}
          />

          {/* 그라데이션 오버레이 및 Expand 버튼 */}
          {shouldTruncate && (
            <div className="absolute bottom-0 left-0 right-0">
              {/* 그라데이션 오버레이 */}
              <div className="h-24 pointer-events-none bg-gradient-to-t from-background/95 via-background/80 to-transparent" />

              {/* Expand 버튼 */}
              <div className="absolute transform -translate-x-1/2 bottom-4 left-1/2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setExpanded(true)}
                  className="transition-all duration-200 border shadow-lg bg-background/95 backdrop-blur-sm hover:bg-background text-foreground"
                >
                  <ChevronDown className="w-4 h-4 mr-2" />
                  {lines.length - maxLines}줄 더 보기
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Collapse 버튼 (확장된 상태일 때) */}
        {expanded && lines.length > maxLines && (
          <div className="flex justify-center pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(false)}
              className="transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronUp className="w-4 h-4 mr-2" />
              접기
            </Button>
          </div>
        )}

        {/* 복사 버튼 */}
        <Button
          variant="outline"
          size="sm"
          className="absolute w-8 h-8 p-0 transition-opacity duration-200 opacity-0 top-2 right-2 group-hover:opacity-100 bg-background/90 backdrop-blur-sm"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
    </div>
  )
}
