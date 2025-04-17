'use client'

import { User } from 'lucide-react'
import Button from '../button'

import { useRouter } from 'next/navigation'
import { useLoggedUser } from '@/app/(site)/loggedUserContext'
import LoggedAccessButtons from './loggedAccessButtons'

export default function AccessButtons() {
  const router = useRouter()
  const { isLogged } = useLoggedUser()

  if (isLogged) {
    return <LoggedAccessButtons />
  }

  return (
    <div className="flex gap-6">
      <Button
        color="secondary"
        className="w-44"
        onClick={() => router.push('/criar-conta')}
      >
        Cadastre-se
      </Button>
      <Button variant="text" onClick={() => router.push('/entrar')}>
        <User size={16} />
        Entrar
      </Button>
    </div>
  )
}
