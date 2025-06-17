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
              hasError ? 'text-destructive' : 'text-foreground'
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-12 w-full rounded-xl bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground',
            'transition-all duration-200 ease-in-out',
            'shadow-none',
            'border border-input',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary',
            'active:scale-[0.995]',
            hasError &&
              'border-destructive focus-visible:ring-destructive focus-visible:border-destructive',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={cn(
              'text-sm mt-2 leading-tight',
              hasError ? 'text-destructive' : 'text-muted-foreground'
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
