'use client'

import Button from '@/components/button'
import { signIn as signInNextAuth } from 'next-auth/react'
import Image from 'next/image'

export default function LoginGoogle() {
  return (
    <Button
      className="sm:w-full w-1/2 py-1"
      variant="outlined"
      color="primary"
      isRounded={false}
      onClick={() => signInNextAuth('google')}
      type="button"
    >
      <Image
        className="size-8"
        src="/images/google-logo.png"
        width={50}
        height={50}
        alt="Ícone Google"
      />
    </Button>
  )
}
