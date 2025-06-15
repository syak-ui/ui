import React from 'react'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { codeToHtml } from 'shiki'

import { transformerLineNumbers } from '@/lib/shiki-transformers/transformerLineNumbers'

import { InstallationTabsClient } from './InstallationTabsClient'

interface InstallationTabsProps {
  componentName: string
  dependencies?: string[]
  sourceCode: string
}

const highlight = (code: string, lang: 'bash' | 'tsx') => {
  return codeToHtml(code, {
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
}

export async function InstallationTabs({
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
  const depsString = dependencies.join(' ')
  const cliCommand = `npx shadcn-ui@latest add ${lowerComponentName}`
  const pnpmCommand = `pnpm add ${depsString}`
  const npmCommand = `npm install ${depsString}`
  const yarnCommand = `yarn add ${depsString}`

  const [cliCode, pnpmCode, npmCode, yarnCode, sourceCodeHighlighted] =
    await Promise.all([
      highlight(cliCommand, 'bash'),
      highlight(pnpmCommand, 'bash'),
      highlight(npmCommand, 'bash'),
      highlight(yarnCommand, 'bash'),
      highlight(sourceCode, 'tsx'),
    ])

  return (
    <InstallationTabsClient
      cliCode={cliCode}
      rawCliCode={cliCommand}
      pnpmCode={pnpmCode}
      rawPnpmCode={pnpmCommand}
      npmCode={npmCode}
      rawNpmCode={npmCommand}
      yarnCode={yarnCode}
      rawYarnCode={yarnCommand}
      sourceCode={sourceCodeHighlighted}
      rawSourceCode={sourceCode}
    />
  )
}
