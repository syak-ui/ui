import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const hasError = !!error

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-semibold leading-tight mb-2 block transition-colors duration-200',
              hasError ? 'text-[#FF3B30]' : 'text-gray-900'
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-12 w-full rounded-xl bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500',
            'transition-all duration-200 ease-in-out',
            'shadow-none',
            'border border-[#E5E8EB]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0050FF] focus-visible:ring-offset-0 focus-visible:border-[#0050FF]',
            hasError &&
              'border-[#FF3B30] focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={cn(
              'text-sm mt-2 leading-tight',
              hasError ? 'text-[#FF3B30]' : 'text-gray-600'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
