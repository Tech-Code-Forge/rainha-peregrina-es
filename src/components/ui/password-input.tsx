'use client'

import { forwardRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { Input, InputProps } from './input'

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pr-10', className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-2"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? (
            <EyeSlash size={24} color="#c8c8c8" aria-hidden="true" />
          ) : (
            <Eye size={24} color="#c8c8c8" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </button>
      </div>
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
