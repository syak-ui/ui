import React from 'react'
import { codeToHtml } from 'shiki'

import { InstallationTabsClient } from './InstallationTabsClient'

interface InstallationTabsProps {
  componentName: string
  dependencies?: string[]
  sourceCode: string
}

const highlight = async (code: string, lang: 'bash' | 'tsx') => {
  const themedCode = await codeToHtml(code, {
    lang,
    theme: 'css-variables',
  })
  return themedCode
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

  const [cliCode, pnpmCode, npmCode, yarnCode, srcCode] = await Promise.all([
    highlight(cliCommand, 'bash'),
    highlight(pnpmCommand, 'bash'),
    highlight(npmCommand, 'bash'),
    highlight(yarnCommand, 'bash'),
    highlight(sourceCode, 'tsx'),
  ])

  const codes = {
    cli: { highlighted: cliCode, raw: cliCommand },
    pnpm: { highlighted: pnpmCode, raw: pnpmCommand },
    npm: { highlighted: npmCode, raw: npmCommand },
    yarn: { highlighted: yarnCode, raw: yarnCommand },
    source: { highlighted: srcCode, raw: sourceCode },
  }

  return <InstallationTabsClient codes={codes} />
}
