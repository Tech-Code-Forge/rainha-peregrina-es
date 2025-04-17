'use client'

import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import EmailVerificationLink from './emailVerificationLink'
import ChangePassword from './changePassword'
import CodeCheck from './codeCheck'
import { ChevronsLeft } from 'lucide-react'

export default function RecoverPasswordRepresentative() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const emailVerificationLinkParam = searchParams.get('email-verification-link')
  const changePasswordParam = searchParams.get('change-password')
  const codeCheckParam = searchParams.get('code-check')

  if (changePasswordParam) {
    return <ChangePassword />
  }

  if (emailVerificationLinkParam) {
    return <EmailVerificationLink />
  }

  if (codeCheckParam) {
    return <CodeCheck />
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] my-5 sm:my-10">
      <div className="flex justify-start w-full mx-5 md:mx-auto max-w-5xl">
        <Button variant="text" size="small" onClick={() => router.back()}>
          <ChevronsLeft size={16} />
          Voltar
        </Button>
      </div>
      <div className="flex flex-col items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
          Esqueceu sua senha?
        </h1>

        <div className="w-full mt-14 flex flex-col gap-4">
          <div>
            <p className="text-sm sm:text-center">
              Sem problemas! Vamos te enviar um link para redefinir sua senha.
            </p>
            <p className="text-sm sm:text-center">
              Por favor, insira o e-mail que você usa para fazer login.
            </p>
          </div>
          <Input
            className="placeholder:text-center"
            type="email"
            placeholder="Insira seu e-mail"
          />

          <Button
            className="w-full mt-4"
            onClick={() =>
              router.push(
                '/representante/recuperar-senha?email-verification-link=true',
              )
            }
          >
            Enviar link de redefinição de senha
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full mt-4"
            onClick={() => router.push('/representante')}
          >
            Retornar
          </Button>
        </div>

        <div className="sm:w-3/4">
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
