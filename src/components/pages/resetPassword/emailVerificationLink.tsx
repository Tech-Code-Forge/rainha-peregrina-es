'use client'

import Button from '@/components/button'
import { SendEmailResetPasswordType } from '@/types/sendEmailResetPasswordType'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EmailVerificationLink({
  email,
}: SendEmailResetPasswordType) {
  const router = useRouter()

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col sm:items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
          Verifique seu e-mail
        </h1>

        <div className="w-full mt-14 flex flex-col gap-4 items-center">
          <p className="text-sm sm:text-center md:w-3/4">
            Acabamos de enviar um e-mail com um link de verificação para{' '}
            <strong>{email}</strong>. Assim que chegar, ele será válido por 10
            minutos.
          </p>

          <Button
            color="secondary"
            className="w-full"
            type="button"
            onClick={() => {
              router.push(`/resetar-senha?email=${email}&code-check=true`)
            }}
          >
            Voltar para login
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full"
            onClick={() => router.push('/resetar-senha')}
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
