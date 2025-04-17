'use client'

import Button from '@/components/button'
import { signIn as signInNextAuth } from 'next-auth/react'
import Image from 'next/image'

export default function CreateFacebook() {
  return (
    <Button
      className="sm:w-full w-1/2 py-1"
      variant="outlined"
      color="primary"
      isRounded={false}
      onClick={() => signInNextAuth('facebook')}
      type="button"
    >
      <Image
        className="size-8"
        src="/images/facebook-logo.png"
        width={50}
        height={50}
        alt="Ícone Facebook"
      />
    </Button>
  )
}
