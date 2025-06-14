'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 rounded-md border-2 border-gray-300 bg-white shadow-none',
      'transition-all duration-200 ease-in-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0050FF] focus-visible:ring-offset-2',
      'data-[state=checked]:bg-[#0050FF] data-[state=checked]:border-[#0050FF] data-[state=checked]:text-white',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'hover:border-gray-400 data-[state=checked]:hover:bg-[#0045E0]',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-3.5 w-3.5 stroke-[3]" />{' '}
      {/* 토스 스타일: 굵은 체크마크 */}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
