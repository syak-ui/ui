'use client'

import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

import { CodeBlock } from '../ui/CodeBlock'

interface CodeBlockData {
  highlighted: string
  raw: string
}

interface InstallationTabsClientProps {
  codes: {
    cli: CodeBlockData
    pnpm: CodeBlockData
    npm: CodeBlockData
    yarn: CodeBlockData
    source: CodeBlockData
  }
}

export function InstallationTabsClient({ codes }: InstallationTabsClientProps) {
  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="mt-4 space-y-4">
        <CodeBlock
          lightCode={codes.cli.highlighted}
          darkCode={codes.cli.highlighted}
          rawCode={codes.cli.raw}
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
                lightCode={codes.pnpm.highlighted}
                darkCode={codes.pnpm.highlighted}
                rawCode={codes.pnpm.raw}
              />
            </TabsContent>
            <TabsContent value="npm" className="mt-2">
              <CodeBlock
                lightCode={codes.npm.highlighted}
                darkCode={codes.npm.highlighted}
                rawCode={codes.npm.raw}
              />
            </TabsContent>
            <TabsContent value="yarn" className="mt-2">
              <CodeBlock
                lightCode={codes.yarn.highlighted}
                darkCode={codes.yarn.highlighted}
                rawCode={codes.yarn.raw}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium">
            2. Copy and paste the following code into your project.
          </h4>
          <CodeBlock
            lightCode={codes.source.highlighted}
            darkCode={codes.source.highlighted}
            rawCode={codes.source.raw}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
