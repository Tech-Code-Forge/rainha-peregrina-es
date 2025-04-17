'use client'

import Button from '@/components/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CodeCheck() {
  const router = useRouter()

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col sm:items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <h1 className="text-2xl sm:text-[32px] text-center text-primary font-bold">
          Enviamos um e-mail de verificação
        </h1>

        <div className="w-full mt-14 flex flex-col gap-4 items-center">
          <p className="text-sm md:text-base text-center md:w-3/4">
            Acabamos de enviar um código de verificação para{' '}
            <strong>seuemail@gamil.com</strong>. Assim que chegar, ele será
            válido por 10 minutos.
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
            onClick={() =>
              router.push('/representante/recuperar-senha?change-password=true')
            }
          >
            Continuar login
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full"
            onClick={() => router.push('/representante/recuperar-senha')}
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
