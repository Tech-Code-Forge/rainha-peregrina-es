import * as React from 'react'

import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  borderColor?: 'primary' | 'secondary'
  icon?: React.ReactNode
  errorMessage?: React.ReactNode
  isLoading?: boolean
  classNameSkeleton?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      errorMessage,
      isLoading,
      classNameSkeleton,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        className={cn(props.label ? 'flex flex-col gap-2 w-full' : 'w-full')}
      >
        {props.label && <span className="text-sm">{props.label}</span>}

        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3 flex items-center pointer-events-none">
              {icon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
              icon ? 'pl-10' : '',
              className,
              props.borderColor === 'secondary' && 'border-gray',
              props.borderColor === 'primary' && 'border-primary',
            )}
            ref={ref}
            {...props}
            disabled={isLoading}
          />
          {isLoading && (
            <Skeleton
              className={cn('absolute inset-0 h-10 w-full', classNameSkeleton)}
            />
          )}
        </div>

        {errorMessage}
      </label>
    )
  },
)
Input.displayName = 'Input'

export { Input }
