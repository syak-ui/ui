'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/Button'

interface CodeBlockProps {
  rawCode: string
  lightCode: string
  darkCode: string
  maxHeight?: number
}

export function CodeBlock({
  rawCode,
  lightCode,
  darkCode,
  maxHeight = 450,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)

  const preRef = useRef<HTMLDivElement>(null)

  const highlightedCode =
    mounted && resolvedTheme === 'dark' ? darkCode : lightCode

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (preRef.current) {
      setIsTruncated(preRef.current.scrollHeight > maxHeight)
    }
  }, [highlightedCode, maxHeight])

  const containerStyle: React.CSSProperties = {
    maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
    overflow: 'hidden',
    position: 'relative',
    transition: 'max-height 0.3s ease-in-out',
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group" suppressHydrationWarning>
      <div style={containerStyle}>
        <div
          ref={preRef}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
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
            {isExpanded ? '접기' : '더 보기'}
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
