import { readDemoCode, readSourceCode } from '@/utils/readSourceCode'

import { Button } from '@/components/ui/Button'
import { CodePreview } from '@/components/docs/CodePreview'
import { DocsPage } from '@/components/docs/DocsPage'
import { DocsPageHeader } from '@/components/docs/DocsPageHeader'
import { DocsPageSection } from '@/components/docs/DocsPageSection'
import { DocsPageToc } from '@/components/docs/DocsPageToc'
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
  { id: 'variants', title: 'Variants' },
  { id: 'installation', title: 'Installation' },
  { id: 'usage', title: 'Usage' },
  { id: 'examples', title: 'Examples' },
]

export default async function ButtonDocsPage() {
  // 페이지에 필요한 모든 소스 코드를 서버에서 미리 읽어옵니다.
  const buttonSourceCode = await readSourceCode('components/ui/Button.tsx')
  const usageCode =
    'import { Button } from "@/components/ui/button"\n\nexport default function Page() {\n  return <Button>Button</Button>\n}'
  const iconDemoCode = await readDemoCode('button', 'ButtonIconDemo')
  const withIconDemoCode = await readDemoCode('button', 'ButtonWithIconDemo')
  const loadingDemoCode = await readDemoCode('button', 'ButtonLoadingDemo')
  const asChildDemoCode = await readDemoCode('button', 'ButtonAsChildDemo')

  return (
    <DocsPage toc={<DocsPageToc items={tocItems} />}>
      <DocsPageHeader
        title="Button"
        description="사용자 액션을 트리거하는 클릭 가능한 버튼 컴포넌트입니다."
      />

      {/* Variants 미리보기 */}
      <DocsPageSection id="variants" title="Variants">
        <CodePreview
          code={
            '<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>'
          }
        >
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </CodePreview>
      </DocsPageSection>

      {/* Installation */}
      <DocsPageSection id="installation" title="Installation">
        <InstallationTabs
          componentName="button"
          sourceCode={buttonSourceCode}
        />
      </DocsPageSection>

      {/* Usage */}
      <DocsPageSection id="usage" title="Usage">
        <CodePreview code={usageCode}>
          <Button>Button</Button>
        </CodePreview>
      </DocsPageSection>

      {/* Examples */}
      <DocsPageSection id="examples" title="Examples">
        <CodePreview title="Icon" code={iconDemoCode}>
          <IconDemo />
        </CodePreview>
        <CodePreview title="With Icon" code={withIconDemoCode}>
          <WithIconDemo />
        </CodePreview>
        <CodePreview title="Loading" code={loadingDemoCode}>
          <LoadingDemo />
        </CodePreview>
        <CodePreview title="As Child" code={asChildDemoCode}>
          <AsChildDemo />
        </CodePreview>
      </DocsPageSection>
    </DocsPage>
  )
}
