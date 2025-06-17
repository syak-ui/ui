'use client'

import React, { useEffect, useMemo, useState } from 'react'

export function useTocObserver(itemIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            // 여러 개가 동시에 보일 때, 가장 위에 있는 것을 활성화하려면
            // 여기서 break를 걸어주면 됩니다.
            break
          }
        }
      },
      // rootMargin: 상단 32px 아래, 화면 하단 80% 위쪽 영역에서 감지
      { rootMargin: '-32px 0px -80% 0px' }
    )

    const elements = itemIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    for (const element of elements) {
      observer.observe(element!)
    }

    return () => {
      for (const element of elements) {
        observer.unobserve(element!)
      }
    }
  }, [itemIds])

  return activeId
}
