'use client'

import Button from '../../button'

import { useLoggedRepresentative } from '@/app/representante/loggedRepresentativeContext'
import { useRouter } from 'next/navigation'
import LoggedAccessButtons from './loggedAccessButtons'

export default function AccessButtons() {
  const router = useRouter()
  const { isLogged } = useLoggedRepresentative()

  if (isLogged) {
    return <LoggedAccessButtons />
  }

  return (
    <div className="flex gap-6">
      <Button
        variant="text"
        onClick={() => router.push('/representante/entrar')}
      >
        Já tenho conta
      </Button>
      <Button
        color="secondary"
        className="w-44"
        onClick={() => router.push('/representante/cadastrar')}
      >
        Cadastre-se
      </Button>
    </div>
  )
}
