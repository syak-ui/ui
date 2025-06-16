import React from 'react'
import { Github } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'

interface EditOnGitHubButtonProps {
  filePath: string
}

const GITHUB_EDIT_URL_PREFIX = 'https://github.com/syak-ui/ui/edit/main/'

export function EditOnGitHubButton({ filePath }: EditOnGitHubButtonProps) {
  const editUrl = `${GITHUB_EDIT_URL_PREFIX}${filePath}`

  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'gap-2'
      )}
    >
      <Github className="w-4 h-4" />
      Edit this page on GitHub
    </a>
  )
}
