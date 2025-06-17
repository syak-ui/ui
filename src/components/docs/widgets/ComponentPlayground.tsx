'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { codeToHtml } from 'shiki'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Switch } from '@/components/ui/Switch'

import { CodeBlock } from '../ui/CodeBlock'

// Playground 컨트롤을 정의하기 위한 타입
type PropControlType = 'string' | 'number' | 'boolean' | 'select'

export interface PlaygroundPropDef {
  name: string
  displayName?: string // [추가] UI에 표시될 한글 이름
  control: {
    type: PropControlType
    options?: readonly (string | number)[]
  }
  defaultValue: string | number | boolean
}

// Props 값의 타입을 정의
type PropValue = string | number | boolean

// Props 상태의 타입을 정의
type PropsState = Record<string, PropValue>

// 컴포넌트 Props 인터페이스
interface ComponentPlaygroundProps {
  title?: string
  componentName: string
  propDefs: PlaygroundPropDef[]
  children: (props: PropsState) => React.ReactNode
  className?: string
  previewClassName?: string
}

export function ComponentPlayground({
  title = 'Props', // 기본값을 'Props'로 설정
  componentName,
  propDefs,
  children,
  className,
  previewClassName,
}: ComponentPlaygroundProps) {
  const [propsState, setPropsState] = useState<PropsState>(() =>
    Object.fromEntries(propDefs.map((p) => [p.name, p.defaultValue]))
  )
  const [highlightedCode, setHighlightedCode] = useState<{
    light: string
    dark: string
  } | null>(null)

  const codeString = useMemo(() => {
    const propsString = Object.entries(propsState)
      .map(([key, value]) => {
        const defaultValue = propDefs.find((p) => p.name === key)?.defaultValue
        if (value === defaultValue) return ''
        if (
          key === 'children' &&
          typeof value === 'string' &&
          value.trim() === ''
        )
          return ''
        if (key === 'children') return '' // children은 태그 사이 내용으로 처리

        if (typeof value === 'boolean') return value ? key : ''
        if (typeof value === 'string') return `${key}="${value}"`
        return `${key}={${value}}`
      })
      .filter(Boolean)
      .join(' ')

    const childrenContent = propsState.children || componentName

    return `<${componentName}${propsString ? ' ' + propsString : ''}>
  ${childrenContent}
</${componentName}>`
  }, [propsState, componentName, propDefs])

  // [수정] CodePreview와 동일하게 라이트/다크 코드를 별도로 생성
  useEffect(() => {
    let isMounted = true
    const highlight = async () => {
      try {
        const [light, dark] = await Promise.all([
          codeToHtml(codeString, { lang: 'tsx', theme: 'github-light' }),
          codeToHtml(codeString, { lang: 'tsx', theme: 'github-dark-default' }),
        ])
        if (isMounted) setHighlightedCode({ light, dark })
      } catch (error) {
        console.error('Error highlighting code:', error)
      }
    }
    highlight()
    return () => {
      isMounted = false
    }
  }, [codeString])

  const handlePropChange = (name: string, value: PropValue) => {
    setPropsState((prev) => ({ ...prev, [name]: value }))
  }

  // glass variant일 때 미리보기 배경을 그라데이션으로 설정
  const isGlassVariant = propsState.variant === 'glass'
  const glassPreviewBg = isGlassVariant
    ? 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20'
    : ''

  return (
    <div className={cn('grid gap-8 lg:grid-cols-2', className)}>
      <div className="flex flex-col gap-6 p-6 border rounded-xl">
        <h3 className="text-lg font-semibold">{title}</h3>
        {propDefs.map((prop) => (
          <div key={prop.name} className="grid items-center grid-cols-3 gap-4">
            <Label htmlFor={prop.name} className="col-span-1 mb-0">
              {prop.displayName || prop.name}
            </Label>
            <div className="col-span-2">
              {prop.control.type === 'string' ? (
                <Input
                  id={prop.name}
                  type="text"
                  value={propsState[prop.name] as string}
                  onChange={(e) => handlePropChange(prop.name, e.target.value)}
                  placeholder="내용을 입력하세요"
                />
              ) : prop.control.type === 'boolean' ? (
                <Switch
                  id={prop.name}
                  checked={propsState[prop.name] as boolean}
                  onCheckedChange={(checked) =>
                    handlePropChange(prop.name, checked)
                  }
                />
              ) : prop.control.type === 'select' ? (
                <Select
                  value={propsState[prop.name] as string}
                  onValueChange={(value) => handlePropChange(prop.name, value)}
                >
                  <SelectTrigger id={prop.name}>
                    <SelectValue placeholder="선택..." />
                  </SelectTrigger>
                  <SelectContent>
                    {prop.control.options?.map((option) => (
                      <SelectItem key={String(option)} value={String(option)}>
                        {String(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={cn(
            'flex items-center justify-center p-8 border rounded-lg min-h-[200px]',
            glassPreviewBg,
            previewClassName
          )}
        >
          {children(propsState)}
        </div>

        {highlightedCode ? (
          <CodeBlock
            rawCode={codeString}
            lightCode={highlightedCode.light}
            darkCode={highlightedCode.dark}
          />
        ) : (
          <div className="h-48 rounded-lg bg-muted animate-pulse" />
        )}
      </div>
    </div>
  )
}
