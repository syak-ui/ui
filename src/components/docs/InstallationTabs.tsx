'use client'

import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

import { CodeBlock } from './CodeBlock'

interface InstallationTabsProps {
  componentName: string
  dependencies?: string[]
  sourceCode: string
}

export function InstallationTabs({
  componentName,
  dependencies = [
    '@radix-ui/react-slot',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
  sourceCode,
}: InstallationTabsProps) {
  const lowerComponentName = componentName.toLowerCase()

  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="mt-4 space-y-4">
        <CodeBlock
          code={`npx shadcn-ui@latest add ${lowerComponentName}`}
          language="bash"
          showLineNumbers={false}
        />
      </TabsContent>

      <TabsContent value="manual" className="mt-4 space-y-6">
        <div>
          <h4 className="mb-3 text-sm font-medium">
            1. Install the following dependencies:
          </h4>

          <Tabs defaultValue="pnpm" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
            </TabsList>

            <TabsContent value="pnpm" className="mt-2">
              <CodeBlock
                code={`pnpm add ${dependencies.join(' ')}`}
                language="bash"
                showLineNumbers={false}
              />
            </TabsContent>

            <TabsContent value="npm" className="mt-2">
              <CodeBlock
                code={`npm install ${dependencies.join(' ')}`}
                language="bash"
                showLineNumbers={false}
              />
            </TabsContent>

            <TabsContent value="yarn" className="mt-2">
              <CodeBlock
                code={`yarn add ${dependencies.join(' ')}`}
                language="bash"
                showLineNumbers={false}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium">
            2. Copy and paste the following code into your project.
          </h4>
          <CodeBlock
            code={sourceCode}
            language="tsx"
            title={`components/ui/${lowerComponentName}.tsx`}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
