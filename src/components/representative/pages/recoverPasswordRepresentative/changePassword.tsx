'use client'

import { useLoggedRepresentative } from '@/app/representante/loggedRepresentativeContext'
import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ChangePassword() {
  const router = useRouter()
  const { setIsLogged, setOpenWelcomeModal } = useLoggedRepresentative()

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col sm:items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
          Crie uma nova senha
        </h1>

        <div className="w-full mt-14 flex flex-col gap-4">
          <p className="text-sm sm:text-center">
            Use pelo menos 10 caracteres, incluindo letras maiúsculas, letras
            minúsculas e números.
          </p>

          <Input
            className="placeholder:text-center"
            placeholder="Insira uma nova senha"
          />

          <Input
            className="placeholder:text-center"
            placeholder="Confirme sua nova senha"
          />

          <Button
            color="secondary"
            className="w-full"
            onClick={() => {
              setIsLogged(true)
              router.push('/representante/painel')
              setOpenWelcomeModal(true)
            }}
          >
            Criar nova senha
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

        <div className="w-full mt-6">
          <div className="flex justify-center">
            <div className="flex flex-col gap-6 items-center mt-12 text-center text-xs text-text font-light sm:w-3/4">
              <div className="w-full h-[1px] bg-gray" />

              <div>
                <p>
                  Ao fazer login ou criar uma conta, você concorda com nossos
                </p>
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
      </div>
    </main>
  )
}
