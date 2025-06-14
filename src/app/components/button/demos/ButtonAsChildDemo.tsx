import Link from 'next/link'

import { Button } from '@/components/ui/Button'

export function AsChildDemo() {
  return (
    <div className="flex gap-4">
      <Button asChild>
        <Link href="/">홈으로 이동</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/about">소개 페이지</Link>
      </Button>
    </div>
  )
}

export default AsChildDemo
