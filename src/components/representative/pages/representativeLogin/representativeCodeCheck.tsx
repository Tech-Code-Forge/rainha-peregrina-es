'use client'

import { useLoggedRepresentative } from '@/app/representante/loggedRepresentativeContext'
import Button from '@/components/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { ChevronsLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RepresentativeCodeCheck() {
  const router = useRouter()
  const { setIsLogged, setOpenWelcomeModal } = useLoggedRepresentative()

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] my-5 sm:my-10">
      <div className="flex justify-start w-full mx-5 md:mx-auto max-w-5xl">
        <Button variant="text" size="small" onClick={() => router.back()}>
          <ChevronsLeft size={16} />
          Voltar
        </Button>
      </div>
      <div className="flex flex-col sm:items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <h1 className="text-2xl sm:text-[32px] text-center text-primary font-bold">
          Verifique seu telefone
        </h1>

        <div className="w-full mt-14 flex flex-col gap-4 items-center">
          <p className="text-sm md:text-base text-center md:w-3/4">
            Nós enviamos para você o código de segurança por SMS.
          </p>

          <div>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            color="secondary"
            className="w-full"
            onClick={() => {
              setIsLogged(true)
              router.push('/representante/verificar-cadastro')
              setOpenWelcomeModal(true)
            }}
          >
            Continuar login
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full"
            onClick={() => router.push('/representante/entrar')}
          >
            Retornar
          </Button>
        </div>

        <div className="sm:w-3/4 mt-6">
          <div className="flex flex-col gap-6 items-center mt-12 text-center text-xs text-text font-light ">
            <div className="w-full h-[1px] bg-gray" />

            <div>
              <p>Ao fazer login ou criar uma conta, você concorda com nossos</p>
              <p>
                <Link
                  href="#"
                  className="text-primary font-normal hover:underline"
                >
                  Termos e Condições
                </Link>{' '}
                e{' '}
                <Link
                  href="#"
                  className="text-primary font-normal hover:underline"
                >
                  Declarações de Privacidade
                </Link>
              </p>
            </div>

            <div className="w-full h-[1px] bg-gray" />

            <div>
              <p>Todos os direitos reservados.</p>
              <p>Direitos autorais (2024) - Rainha das Peregrinações®</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
