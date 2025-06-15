'use client'

import React from 'react'

import { CodeBlock } from './CodeBlock'
import {
  DocsTabs,
  DocsTabsContent,
  DocsTabsList,
  DocsTabsTrigger,
} from './DocsTabs'

interface InstallationTabsClientProps {
  cliCode: string
  rawCliCode: string
  pnpmCode: string
  rawPnpmCode: string
  npmCode: string
  rawNpmCode: string
  yarnCode: string
  rawYarnCode: string
  sourceCode: string
  rawSourceCode: string
}

export function InstallationTabsClient({
  cliCode,
  rawCliCode,
  pnpmCode,
  rawPnpmCode,
  npmCode,
  rawNpmCode,
  yarnCode,
  rawYarnCode,
  sourceCode,
  rawSourceCode,
}: InstallationTabsClientProps) {
  return (
    <DocsTabs defaultValue="cli" className="w-full">
      <DocsTabsList className="grid w-full grid-cols-2">
        <DocsTabsTrigger value="cli">CLI</DocsTabsTrigger>
        <DocsTabsTrigger value="manual">Manual</DocsTabsTrigger>
      </DocsTabsList>

      <DocsTabsContent value="cli" className="mt-4 space-y-4">
        <CodeBlock rawCode={rawCliCode} highlightedCode={cliCode} />
      </DocsTabsContent>

      <DocsTabsContent value="manual" className="mt-4 space-y-6">
        <div>
          <h4 className="mb-3 text-sm font-medium">
            1. Install the following dependencies:
          </h4>
          <DocsTabs defaultValue="pnpm" className="w-full">
            <DocsTabsList className="grid w-full grid-cols-3">
              <DocsTabsTrigger value="pnpm">pnpm</DocsTabsTrigger>
              <DocsTabsTrigger value="npm">npm</DocsTabsTrigger>
              <DocsTabsTrigger value="yarn">yarn</DocsTabsTrigger>
            </DocsTabsList>
            <DocsTabsContent value="pnpm" className="mt-2">
              <CodeBlock rawCode={rawPnpmCode} highlightedCode={pnpmCode} />
            </DocsTabsContent>
            <DocsTabsContent value="npm" className="mt-2">
              <CodeBlock rawCode={rawNpmCode} highlightedCode={npmCode} />
            </DocsTabsContent>
            <DocsTabsContent value="yarn" className="mt-2">
              <CodeBlock rawCode={rawYarnCode} highlightedCode={yarnCode} />
            </DocsTabsContent>
          </DocsTabs>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium">
            2. Copy and paste the following code into your project.
          </h4>
          <CodeBlock rawCode={rawSourceCode} highlightedCode={sourceCode} />
        </div>
      </DocsTabsContent>
    </DocsTabs>
  )
}
