'use client'

import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function ThemeToggle() {
  // 나중에 next-themes 라이브러리를 사용해 실제 기능을 구현합니다.
  // const { setTheme, theme } = useTheme()

  return (
    <Button variant="ghost" size="icon">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
