'use client'

import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
// import EmailVerificationLink from './emailVerificationLink'
import { useForm } from 'react-hook-form'
import InputErrorMessage from '../inputErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useState, useEffect } from 'react'
import { SendEmailResetPasswordType } from '@/types/sendEmailResetPasswordType'
import { postEmail } from '@/api/reset-passaword'

export default function RecoverPassword() {
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SendEmailResetPasswordType>()

  const sendEmail = useMutation({
    mutationFn: (emailData: SendEmailResetPasswordType) => postEmail(emailData),
    onSuccess: () => {
      router.push(`/resetar-senha?email=${watchEmail}`)
    },
    onError: error => {
      toast({
        title: 'Erro ao enviar e-mail',
        description: error.message,
      })
    },
  })

  const watchEmail = watch('email')
  useEffect(() => {
    if (watchEmail) {
      setEmail(watchEmail)
    }
  }, [watchEmail])

  const handleOnSubmit = (email: SendEmailResetPasswordType) => {
    sendEmail.mutate(email)
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)]">
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
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Input
              className="placeholder:text-center"
              type="email"
              placeholder="Insira seu e-mail"
              {...register('email', {
                required: 'Este campo é obrigatório',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Insira um e-mail válido',
                },
              })}
              errorMessage={
                errors.email && (
                  <InputErrorMessage error={errors.email.message} />
                )
              }
              isLoading={sendEmail.isPending}
            />

            <Button
              className="w-full mt-4"
              type="submit"
              disabled={sendEmail.isPending}
            >
              Enviar link de redefinição de senha
            </Button>
          </form>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full mt-4"
            onClick={() => router.push('/')}
            disabled={sendEmail.isPending}
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
