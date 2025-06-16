import React from 'react'
import { codeToHtml } from 'shiki'

import { InstallationTabsClient } from './InstallationTabsClient'

interface InstallationTabsProps {
  componentName: string
  dependencies?: string[]
  sourceCode: string
}

const highlight = async (code: string, lang: 'bash' | 'tsx') => {
  const [light, dark] = await Promise.all([
    codeToHtml(code, { lang, theme: 'solarized-light' }),
    codeToHtml(code, { lang, theme: 'one-dark-pro' }),
  ])
  return { light, dark }
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

  const [cli, pnpm, npm, yarn, source] = await Promise.all([
    highlight(cliCommand, 'bash'),
    highlight(pnpmCommand, 'bash'),
    highlight(npmCommand, 'bash'),
    highlight(yarnCommand, 'bash'),
    highlight(sourceCode, 'tsx'),
  ])

  const codeBlocks = {
    cli: { ...cli, raw: cliCommand },
    pnpm: { ...pnpm, raw: pnpmCommand },
    npm: { ...npm, raw: npmCommand },
    yarn: { ...yarn, raw: yarnCommand },
    source: { ...source, raw: sourceCode },
  }

  return <InstallationTabsClient codeBlocks={codeBlocks} />
}
