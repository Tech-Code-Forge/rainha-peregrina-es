'use client'

import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'neutral'
  isRounded?: boolean
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
}

export default function Button({
  children,
  className,
  variant = 'contained',
  color = 'primary',
  isRounded = true,
  size = 'medium',
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={twMerge(
        'px-4 py-2 flex items-center justify-center gap-2',
        variant === 'contained' &&
          twMerge(
            color === 'primary' && 'bg-primary text-white',
            color === 'secondary' &&
              'bg-secondary text-white hover:brightness-95 duration-300',
          ),
        variant === 'outlined' &&
          twMerge(
            'border transition-colors duration-300',
            color === 'primary' &&
              'border-primary text-primary hover:border-primary-light hover:text-primary-light',
            color === 'secondary' && 'border-secondary text-secondary',
            color === 'neutral' &&
              'border-text text-text hover:bg-gray transition-colors duration-300',
          ),

        variant === 'text' &&
          twMerge(
            'bg-transparent font-bold transition-colors duration-300',
            color === 'primary' && 'text-primary hover:bg-background',
            color === 'secondary' && 'text-secondary',
          ),

        isRounded && 'rounded-lg',
        size === 'small' && 'text-xs',
        size === 'medium' && 'text-sm',
        size === 'large' && 'text-lg',
        'disabled:bg-gray disabled:cursor-not-allowed',
        className,
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border border-t-transparent border-primary-light rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
