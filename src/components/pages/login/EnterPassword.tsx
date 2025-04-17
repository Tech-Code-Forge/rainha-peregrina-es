'use client'

import { signInWithLink } from '@/api/auth'
import Button from '@/components/button'
import { PasswordInput } from '@/components/ui/password-input'
// import { validatePassword } from '@/components/utils/validatePassword'
import { useToast } from '@/hooks/use-toast'
import { SendEmailLinkLoginType } from '@/types/login/sendEmailLinkLoginType'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { InputFieldsSignInType } from '.'
import InputErrorMessage from '../inputErrorMessage'
import EmailVerificationLink from './EmailVerificationLink'

export default function EnterPassword() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLink, setIsLink] = useState(false)
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<InputFieldsSignInType>()

  const watchEmail = watch('email')
  const email = watchEmail

  const sendEmailLinkLogin = useMutation({
    mutationFn: (emailData: SendEmailLinkLoginType) =>
      signInWithLink(emailData),
    onSuccess: () => {
      toast({
        title: 'E-mail enviado com sucesso!',
        description: 'Verifique sua caixa de entrada.',
      })
    },
  })

  const handleClickLinkLogin = () => {
    if (email) {
      setIsLink(true)
      sendEmailLinkLogin.mutate({ email })
      console.log('email: ', { email })
    } else {
      toast({
        title: 'Erro',
        description:
          'Não foi possível enviar o e-mail, o endereço de e-mail não está disponível.',
        variant: 'destructive',
      })
    }
  }

  if (isLink) return <EmailVerificationLink email={watchEmail} />

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col sm:items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
          Digite sua senha
        </h1>

        <div className="w-full mt-14 flex flex-col gap-4">
          <p className="text-sm sm:text-center">
            Por favor, digite sua senha para o e-email{' '}
            <strong>{watchEmail}</strong>
          </p>

          <PasswordInput
            className="placeholder:text-center"
            placeholder="Insira sua senha"
            {...register('password', {
              required: 'Este campo é obrigatório',
              // validate: validatePassword,
            })}
            errorMessage={
              errors.password && (
                <InputErrorMessage error={errors.password?.message} />
              )
            }
          />

          <Button color="secondary" className="w-full" type="submit">
            Login
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full"
            onClick={() => router.push('/entrar')}
          >
            Retornar
          </Button>
        </div>

        <div className="flex items-center my-6 w-full gap-4">
          <div className="h-[0.5px] w-full bg-text" />
          <span className="text-text text-sm text-nowrap">ou</span>
          <div className="h-[0.5px] w-full bg-text" />
        </div>

        <div className="w-full">
          <div className="flex flex-col items-center gap-4 justify-center">
            <Button
              className="w-full"
              variant="outlined"
              color="primary"
              onClick={handleClickLinkLogin}
            >
              Fazer login com link de verificação
            </Button>

            <div className="text-sm flex gap-1">
              <p>Esqueceu sua senha?</p>
              <Link
                href="/recuperar-senha"
                className="text-primary hover:underline"
              >
                Recupere agora
              </Link>
            </div>
          </div>

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
