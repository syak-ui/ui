import Link from 'next/link'
import { Github } from 'lucide-react'

import { Button } from '@/components/ui/Button' // 우리의 Button 컴포넌트 사용

interface EditOnGitHubButtonProps {
  filePath: string
}

// TODO: GitHub 저장소 URL을 환경변수 등으로 관리
const GITHUB_REPO_URL = 'https://github.com/syak-ui/ui/blob/main'

export function EditOnGitHubButton({ filePath }: EditOnGitHubButtonProps) {
  const href = `${GITHUB_REPO_URL}/${filePath}`

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Button variant="outline" size="sm" className="gap-2">
        <Github className="w-4 h-4" />
        Edit this page on GitHub
      </Button>
    </Link>
  )
}
