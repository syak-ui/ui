import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] w-full sm:w-auto',
  {
    variants: {
      variant: {
        default:
          'bg-[#0050FF] text-white hover:bg-[#0045E0] focus-visible:ring-[#0050FF] shadow-none border-0 disabled:bg-[#E5E8EB] disabled:text-[#A0AEC0]',
        secondary:
          'bg-[#F2F4F6] text-gray-900 hover:bg-[#E5E8EB] focus-visible:ring-gray-500 shadow-none border-0 disabled:bg-[#E5E8EB] disabled:text-[#A0AEC0]',
        outline:
          'border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-500 shadow-none',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 shadow-none border-0',
        ghost:
          'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 shadow-none border-0',
        link: 'text-[#0050FF] underline-offset-4 hover:underline focus-visible:ring-[#0050FF] shadow-none border-0 p-0',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 px-4 py-2 text-sm',
        lg: 'h-14 px-8 py-4 text-lg',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
