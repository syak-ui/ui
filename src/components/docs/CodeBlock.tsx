// components/docs/CodeBlock.tsx (최종 수정본)
'use client'

import React, { useState } from 'react'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'

import { Button } from '@/components/ui/Button'

interface CodeBlockProps {
  rawCode: string
  highlightedCode: string
  maxLines?: number
}

export function CodeBlock({
  rawCode,
  highlightedCode,
  maxLines = 12,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const containerStyle: React.CSSProperties = {
    maxHeight: isExpanded ? 'none' : `${maxLines * 1.5}rem`,
    overflow: 'hidden',
    position: 'relative',
    transition: 'max-height 0.3s ease-in-out',
  }

  const totalLines = rawCode.split('\n').length
  const isTruncated = totalLines > maxLines

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div style={containerStyle}>
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        {isTruncated && !isExpanded && (
          <div className="absolute bottom-0 w-full h-24 pointer-events-none bg-gradient-to-t from-background to-transparent" />
        )}
      </div>

      {isTruncated && (
        <div className="flex justify-center -mt-8">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border shadow-lg bg-background/80 backdrop-blur-sm"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 mr-2" />
            ) : (
              <ChevronDown className="w-4 h-4 mr-2" />
            )}
            {isExpanded ? '접기' : `${totalLines - maxLines}줄 더 보기`}
          </Button>
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute w-8 h-8 transition-opacity duration-200 top-2 right-2"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}
