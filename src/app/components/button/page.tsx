'use client'

import { ButtonHTMLAttributes } from 'react'
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
import { TableOfContents } from '@/components/docs/widgets/TableOfContents'

const propDefs: PlaygroundPropDef[] = [
  {
    name: 'variant',
    control: {
      type: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    defaultValue: 'default',
  },
  {
    name: 'size',
    control: {
      type: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    defaultValue: 'default',
  },
  {
    name: 'children',
    control: { type: 'string' },
    defaultValue: 'Button',
  },
  {
    name: 'disabled',
    control: { type: 'boolean' },
    defaultValue: false,
  },
]

type ButtonProps = VariantProps<typeof buttonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>

const toc = [
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'playground', title: 'Playground', level: 1 },
  { id: 'props', title: 'Props', level: 1 },
]

export default function ButtonPage() {
  return (
    <DocsPage toc={<TableOfContents items={toc} />}>
      <DocsPageHeader
        title="Button"
        description="Displays a button or a link with button styling."
      />

      <div className="pb-12">
        <EditOnGitHubButton filePath="src/components/ui/Button.tsx" />
      </div>

      <section id="usage" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        <CodePreview title="Default" code={'<Button>Button</Button>'}>
          <Button>Button</Button>
        </CodePreview>

        <CodePreview
          title="Secondary"
          code={'<Button variant="secondary">Secondary</Button>'}
        >
          <Button variant="secondary">Secondary</Button>
        </CodePreview>

        <CodePreview
          title="Destructive"
          code={'<Button variant="destructive">Destructive</Button>'}
        >
          <Button variant="destructive">Destructive</Button>
        </CodePreview>

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

      <section id="playground" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Playground</h2>
        <div className="mt-4">
          <ComponentPlayground componentName="Button" propDefs={propDefs}>
            {(props: ButtonProps) => <Button {...props} />}
          </ComponentPlayground>
        </div>
      </section>

      <section id="props" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
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
