'use client'

import { ButtonHTMLAttributes } from 'react'
import { docsConfig } from '@/constants/docs'
import { VariantProps } from 'class-variance-authority'
import { ChevronRight } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/Button'
import { DocsPage } from '@/components/docs/layouts/DocsPage'
import { DocsPageHeader } from '@/components/docs/layouts/DocsPageHeader'
import { EditOnGitHubButton } from '@/components/docs/ui/EditOnGitHubButton'
import { PropsTable } from '@/components/docs/ui/PropsTable'
import { CodePreview } from '@/components/docs/widgets/CodePreview'
import {
  ComponentPlayground,
  type PlaygroundPropDef,
} from '@/components/docs/widgets/ComponentPlayground'
import { DocsPager } from '@/components/docs/widgets/DocsPager'
import { TableOfContents } from '@/components/docs/widgets/TableOfContents'

const propDefs: PlaygroundPropDef[] = [
  {
    name: 'variant',
    displayName: '종류',
    control: {
      type: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'glass',
      ],
    },
    defaultValue: 'default',
  },
  {
    name: 'size',
    displayName: '크기',
    control: { type: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    defaultValue: 'default',
  },
  {
    name: 'children',
    displayName: '내용',
    control: { type: 'string' },
    defaultValue: 'Button',
  },
  {
    name: 'disabled',
    displayName: '비활성화',
    control: { type: 'boolean' },
    defaultValue: false,
  },
]

type ButtonProps = VariantProps<typeof buttonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>

const toc = [
  { id: 'playground', title: '플레이그라운드', level: 1 },
  { id: 'usage', title: '사용법', level: 1 },
  { id: 'examples', title: '활용 예시', level: 1 },
  { id: 'props', title: 'API 레퍼런스', level: 1 },
]

export default function ButtonPage() {
  return (
    <DocsPage toc={<TableOfContents items={toc} />}>
      <DocsPageHeader
        title="버튼"
        description="클릭 가능한 버튼을 표시하거나, 다른 요소에 버튼 스타일을 적용합니다."
      />

      <div className="flex items-center justify-between">
        <EditOnGitHubButton filePath="src/components/ui/Button.tsx" />
        <DocsPager toc={docsConfig.sidebarNav} />
      </div>

      <section id="playground" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          플레이그라운드
        </h2>
        <div className="mt-4">
          <ComponentPlayground componentName="Button" propDefs={propDefs}>
            {(props: ButtonProps) => <Button {...props} />}
          </ComponentPlayground>
        </div>
      </section>

      <section id="usage" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">사용법</h2>
        <div className="mt-4">
          <CodePreview
            code={
              "import { Button } from '@/components/ui/Button'\n\nexport default () => <Button>Click me</Button>"
            }
          >
            <Button>Click me</Button>
          </CodePreview>
        </div>
      </section>

      <section id="examples" className="space-y-8 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">활용 예시</h2>
        <CodePreview
          title="Outline"
          code={'<Button variant="outline">Outline</Button>'}
        >
          <Button variant="outline">Outline</Button>
        </CodePreview>

        <CodePreview
          title="Ghost"
          code={'<Button variant="ghost">Ghost</Button>'}
        >
          <Button variant="ghost">Ghost</Button>
        </CodePreview>

        <CodePreview title="Link" code={'<Button variant="link">Link</Button>'}>
          <Button variant="link">Link</Button>
        </CodePreview>

        <CodePreview
          title="With Icon"
          code={`import { ChevronRight } from 'lucide-react'
          <Button>
            <ChevronRight className="w-4 h-4 mr-2" /> Login with Email
          </Button>`}
        >
          <Button>
            <ChevronRight className="w-4 h-4 mr-2" /> Login with Email
          </Button>
        </CodePreview>
      </section>

      <section id="props" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">API 레퍼런스</h2>
        <div className="mt-4">
          <PropsTable
            data={[
              {
                name: 'variant',
                type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
                defaultValue: '"default"',
                description: 'The variant of the button.',
              },
              {
                name: 'size',
                type: '"default" | "sm" | "lg" | "icon"',
                defaultValue: '"default"',
                description: 'The size of the button.',
              },
              {
                name: 'asChild',
                type: 'boolean',
                defaultValue: 'false',
                description:
                  'Render as a child component, inheriting its props.',
              },
            ]}
          />
        </div>
      </section>
    </DocsPage>
  )
}
