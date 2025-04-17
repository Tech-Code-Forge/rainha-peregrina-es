'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import SmsVerification from './smsVerification'
import Button from '@/components/button'
import AuthenticationConfirmed from './authenticationConfirmed'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { SendEmailTwoFactorType } from '@/types/two-factor-auth/sendEmailTwoFactorType'
import { useForm } from 'react-hook-form'
import SmsCodeCheck from './smsCodeCheck'
import { Skeleton } from '@/components/ui/skeleton'
import { getUsersInfo } from '@/api/users'
import { postEmailTwoFactor } from '@/api/two-factor-auth'

export default function TwoFactorAuthentication() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { handleSubmit } = useForm<SendEmailTwoFactorType>()

  const smsVerificationParam = searchParams.get('sms-verification')
  const authenticationConfirmed = searchParams.get('authentication-confirmed')
  const smsCodeCheckParam = searchParams.get('sms-code-check')

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUsersInfo,
  })
  const email = user?.email

  const emailSend = useMutation({
    mutationFn: (emailData: SendEmailTwoFactorType) =>
      postEmailTwoFactor(emailData),
    onSuccess: () => {
      toast({
        title: 'E-mail enviado com sucesso!',
        description: 'Verifique sua caixa de entrada.',
      })
      router.push('/autenticacao-dois-fatores?sms-verification=true')
    },
    onError: error => {
      toast({
        title: error.message,
        description:
          'Não foi possível enviar o email, tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
  })

  const handleOnSubmit = (data: SendEmailTwoFactorType) => {
    if (email) {
      emailSend.mutate(data)
    } else {
      toast({
        title: 'Erro',
        description:
          'Não foi possível enviar o e-mail, o endereço de e-mail não está disponível.',
        variant: 'destructive',
      })
    }
  }

  if (smsVerificationParam) {
    return <SmsVerification />
  }

  if (authenticationConfirmed) {
    return <AuthenticationConfirmed />
  }

  if (smsCodeCheckParam) {
    return <SmsCodeCheck />
  }

  if (error) {
    toast({
      title: error.message,
      description: 'Tente novamente mais tarde',
      variant: 'destructive',
    })
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)] text-text">
      <div className="flex flex-col items-center mx-5 sm:max-w-3xl my-10 sm:my-20">
        <h1 className="text-primary font-bold text-2xl md:text-[32px] text-center">
          Cadastro para Autenticação de 2 fatores
        </h1>

        <div className="flex flex-col items-center mt-6 text-sm md:text-base">
          <span className="text-primary font-semibold">
            Passo 1 - Verificação de E-mail
          </span>
          <div className="flex gap-2 mt-2">
            <div className="bg-primary w-14 h-1"></div>
            <div className="bg-gray w-14 h-1"></div>
            <div className="bg-gray w-14 h-1"></div>
          </div>
        </div>

        <div className="mt-4 mb-10 text-center text-sm md:text-base">
          <p>Vamos te ajudar a deixa sua conta mais segura!</p>
          <div className="flex flex-row items-center gap-1">
            <p>Iremos enviar um e-mail para verificação para o</p>
            {isLoading ? (
              <span>
                <Skeleton className="w-[200px] h-[16px]" />
              </span>
            ) : (
              <span className="text-secondary"> {email}</span>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Button
            type="submit"
            className="w-full md:w-auto"
            isLoading={isLoading}
          >
            Enviar link de verificação no e-mail
          </Button>
        </form>

        <span className="mt-6 text-xs text-center md:text-sm">
          Enviar e-mail de verificação novamente em{' '}
          <span className="text-primary">5 segundos.</span>
        </span>
      </div>
    </main>
  )
}
