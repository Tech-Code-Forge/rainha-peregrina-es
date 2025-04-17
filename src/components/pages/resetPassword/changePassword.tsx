'use client'

import Button from '@/components/button'
import { PasswordInput } from '@/components/ui/password-input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import InputErrorMessage from '../inputErrorMessage'
import { InputFieldsResetPasswordType } from './'
// import { validatePassword } from '@/components/utils/validatePassword'

export default function ChangePassword({ loading }: { loading: boolean }) {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<InputFieldsResetPasswordType>()

  const password = watch('password')

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

          <PasswordInput
            className="placeholder:text-center"
            placeholder="Insira uma nova senha"
            {...register('password', {
              required: 'A senha é obrigatória.',
              // validate: validatePassword,
            })}
            isLoading={loading}
            errorMessage={
              errors.password && (
                <InputErrorMessage error={errors.password.message} />
              )
            }
          />

          <PasswordInput
            className="placeholder:text-center"
            placeholder="Confirme sua nova senha"
            {...register('confirmPassword', {
              required: 'Confirmação de senha é obrigatória.',
              validate: value =>
                value === password || 'As senhas não coincidem.',
            })}
            isLoading={loading}
            errorMessage={
              errors.confirmPassword && (
                <InputErrorMessage error={errors.confirmPassword.message} />
              )
            }
          />

          <Button
            color="secondary"
            className="w-full"
            type="submit"
            disabled={loading}
          >
            Criar nova senha
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full"
            onClick={() => router.push('/recuperar-senha')}
            disabled={loading}
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
