'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="flex items-center gap-4">
      <Button disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        로딩 중...
      </Button>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            처리 중...
          </>
        ) : (
          '클릭하세요'
        )}
      </Button>
    </div>
  )
}

export default LoadingDemo
