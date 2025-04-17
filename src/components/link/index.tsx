import Link from 'next/link'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface LinkProps extends ComponentProps<'a'> {
  children: React.ReactNode
  href: string
}

export default function BasicLink({ children, href, ...props }: LinkProps) {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge(
        'text-primary font-bold hover:text-primary-light transition-colors duration-300',
        props.className,
      )}
    >
      {children}
    </Link>
  )
}
