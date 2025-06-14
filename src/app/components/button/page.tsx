import { readDemoCode, readSourceCode } from '@/utils/readSourceCode'

import { Button } from '@/components/ui/Button'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { DocsPage } from '@/components/docs/DocsPage'
import { DocsPageHeader } from '@/components/docs/DocsPageHeader'
import { DocsPageSection } from '@/components/docs/DocsPageSection'
import { DocsPageToc } from '@/components/docs/DocsPageToc'
import { ExampleCard } from '@/components/docs/ExampleCard'
import { InstallationTabs } from '@/components/docs/InstallationTabs'

import { AsChildDemo } from './demos/ButtonAsChildDemo'
import { IconDemo } from './demos/ButtonIconDemo'
import { LoadingDemo } from './demos/ButtonLoadingDemo'
import { WithIconDemo } from './demos/ButtonWithIconDemo'

export const metadata = {
  title: 'Button',
  description: '사용자 액션을 트리거하는 클릭 가능한 버튼 컴포넌트입니다.',
}

// 목차 구성
const tocItems = [
  { id: 'preview', title: '미리보기' },
  { id: 'installation', title: 'Installation' },
  { id: 'usage', title: 'Usage' },
  { id: 'examples', title: 'Examples' },
]

export default async function ButtonDocsPage() {
  // 동적으로 소스 코드 읽기
  const buttonSourceCode = await readSourceCode('components/ui/Button.tsx')
  const iconDemoCode = await readDemoCode('button', 'ButtonIconDemo')
  const loadingDemoCode = await readDemoCode('button', 'ButtonLoadingDemo')
  const asChildDemoCode = await readDemoCode('button', 'ButtonAsChildDemo')
  const withIconDemoCode = await readDemoCode('button', 'ButtonWithIconDemo')

  return (
    <DocsPage toc={<DocsPageToc items={tocItems} />}>
      <DocsPageHeader
        title="Button"
        description="사용자 액션을 트리거하는 클릭 가능한 버튼 컴포넌트입니다."
      />

      {/* 미리보기 */}
      <DocsPageSection id="preview" title="미리보기">
        <div className="flex items-center justify-center p-6 border rounded-lg bg-background">
          <Button>Button</Button>
        </div>
      </DocsPageSection>

      {/* Installation */}
      <DocsPageSection id="installation" title="Installation">
        <InstallationTabs
          componentName="Button"
          dependencies={[
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ]}
          sourceCode={buttonSourceCode}
        />
      </DocsPageSection>

      {/* Usage */}
      <DocsPageSection id="usage" title="Usage">
        <CodeBlock
          code={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Button</Button>
}`}
          language="tsx"
          showLineNumbers={false}
        />
      </DocsPageSection>

      {/* Examples */}
      <DocsPageSection id="examples" title="Examples">
        <div className="space-y-8">
          {/* Default */}
          <ExampleCard title="Default" code={'<Button>Button</Button>'}>
            <Button>Button</Button>
          </ExampleCard>

          {/* Secondary */}
          <ExampleCard
            title="Secondary"
            code={'<Button variant="secondary">Secondary</Button>'}
          >
            <Button variant="secondary">Secondary</Button>
          </ExampleCard>

          {/* Destructive */}
          <ExampleCard
            title="Destructive"
            code={'<Button variant="destructive">Destructive</Button>'}
          >
            <Button variant="destructive">Destructive</Button>
          </ExampleCard>

          {/* Outline */}
          <ExampleCard
            title="Outline"
            code={'<Button variant="outline">Outline</Button>'}
          >
            <Button variant="outline">Outline</Button>
          </ExampleCard>

          {/* Ghost */}
          <ExampleCard
            title="Ghost"
            code={'<Button variant="ghost">Ghost</Button>'}
          >
            <Button variant="ghost">Ghost</Button>
          </ExampleCard>

          {/* Link */}
          <ExampleCard
            title="Link"
            code={'<Button variant="link">Link</Button>'}
          >
            <Button variant="link">Link</Button>
          </ExampleCard>

          {/* Icon */}
          <ExampleCard title="Icon" code={iconDemoCode}>
            <IconDemo />
          </ExampleCard>

          {/* With Icon */}
          <ExampleCard
            title="With Icon"
            description="아이콘과 텍스트가 함께 있는 버튼 컴포넌트입니다. 다양한 크기의 아이콘을 지원합니다."
            code={withIconDemoCode}
          >
            <WithIconDemo />
          </ExampleCard>

          {/* Loading */}
          <ExampleCard title="Loading" code={loadingDemoCode}>
            <LoadingDemo />
          </ExampleCard>

          {/* As Child */}
          <ExampleCard title="As Child" code={asChildDemoCode}>
            <AsChildDemo />
          </ExampleCard>
        </div>
      </DocsPageSection>
    </DocsPage>
  )
}
