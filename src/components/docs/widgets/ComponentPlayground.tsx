'use client'

import React, { useMemo, useState } from 'react'

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

import { CodePreview } from './CodePreview'

type PropControlType = 'string' | 'number' | 'boolean' | 'select'

export interface PlaygroundPropDef {
  name: string
  control: {
    type: PropControlType
    options?: (string | number)[]
  }
  defaultValue: string | number | boolean
}

interface ComponentPlaygroundProps {
  componentName: string
  propDefs: PlaygroundPropDef[]
  children: (props: Record<string, any>) => React.ReactNode
}

export function ComponentPlayground({
  componentName,
  propDefs,
  children,
}: ComponentPlaygroundProps) {
  const [propsState, setPropsState] = useState(() =>
    Object.fromEntries(propDefs.map((p) => [p.name, p.defaultValue]))
  )

  const handlePropChange = (name: string, value: any) => {
    setPropsState((prev) => ({ ...prev, [name]: value }))
  }

  const codeString = useMemo(() => {
    const propsString = Object.entries(propsState)
      .map(([key, value]) => {
        if (typeof value === 'boolean') return value ? key : ''
        if (typeof value === 'string') return `${key}="${value}"`
        return `${key}={${value}}`
      })
      .filter(Boolean)
      .join(' ')

    return `<${componentName} ${propsString}>
  ${componentName}
</${componentName}>`
  }, [propsState, componentName])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 border rounded-xl">
        <h3 className="text-lg font-semibold">Props</h3>
        {propDefs.map((prop) => (
          <div key={prop.name} className="flex flex-col gap-2">
            <Label htmlFor={prop.name}>{prop.name}</Label>
            {prop.control.type === 'string' && (
              <Input
                id={prop.name}
                type="text"
                value={propsState[prop.name] as string}
                onChange={(e) => handlePropChange(prop.name, e.target.value)}
              />
            )}
            {prop.control.type === 'boolean' && (
              <Switch
                id={prop.name}
                checked={propsState[prop.name] as boolean}
                onCheckedChange={(checked) =>
                  handlePropChange(prop.name, checked)
                }
              />
            )}
            {prop.control.type === 'select' && (
              <Select
                value={propsState[prop.name] as string}
                onValueChange={(value) => handlePropChange(prop.name, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {prop.control.options?.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {String(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <CodePreview code={codeString}>{children(propsState)}</CodePreview>
      </div>
    </div>
  )
}
