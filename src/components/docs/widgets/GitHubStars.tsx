'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'

import { Button } from '@/components/ui/Button'

// 숫자를 'k' 포맷으로 변환하는 함수 (예: 88600 -> 88.6k)
function formatStars(num: number) {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    // GitHub API를 호출하여 syak-ui/ui 레포지토리 정보를 가져옵니다.
    fetch('https://api.github.com/repos/syak-ui/ui')
      .then((res) => res.json())
      .then((data) => {
        // stargazers_count 값을 state에 저장합니다.
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch((error) => {
        console.error('Failed to fetch GitHub stars:', error)
      })
  }, []) // 컴포넌트가 마운트될 때 한 번만 실행합니다.

  return (
    <Link href="https://github.com/syak-ui/ui" target="_blank" rel="noreferrer">
      <Button variant="ghost" className="flex items-center gap-2 px-3">
        <Github className="w-4 h-4" />
        <span className="text-sm font-medium">
          {/* stars state 값에 따라 조건부 렌더링 */}
          {stars !== null ? formatStars(stars) : ''}
        </span>
      </Button>
    </Link>
  )
}
