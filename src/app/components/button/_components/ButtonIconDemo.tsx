import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function IconDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="outline" size="icon">
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button size="icon">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default IconDemo
