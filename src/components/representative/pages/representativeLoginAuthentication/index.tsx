'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { SendPhoneTwoFactorType } from '@/types/two-factor-auth/sendPhoneTwoFactorType'
import { useToast } from '@/hooks/use-toast'
import EmailAuthentication from './emailAuthentication'
import SMSAuthentication from './smsAuthentication'
import { postRpresentativePhoneTwoFactor } from '@/api/representative/two-factor-auth'

export default function RepresentativeLoginAuthentication() {
  const [emailVerification, setEmailVerification] = useState(false)
  const [smsVerification, setSmsVerification] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const email = 'teste01@teste.com'
  const phone = '+5532999993333'

  const { handleSubmit, setValue: setPhoneValue } =
    useForm<SendPhoneTwoFactorType>({
      defaultValues: { phone: phone || '' },
    })

  useEffect(() => {
    setPhoneValue('phone', phone || '')
  }, [phone])

  const sendSmsVerification = useMutation({
    mutationFn: (dataPhone: SendPhoneTwoFactorType) =>
      postRpresentativePhoneTwoFactor(dataPhone),
    onSuccess: () => {
      setSmsVerification(true)
      toast({
        title: 'SMS enviado!',
        description: 'Verifique sua caixa de entrada.',
      })
    },
    onError: error => {
      toast({
        title: 'Erro ao enviar SMS',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const handleSendSmsVerification = (data: SendPhoneTwoFactorType) => {
    // if (phone) {
    //   sendSmsVerification.mutate(data)
    // }
    setSmsVerification(true) //this is a temporary solution, because the representative doesn't have an endpoint yet.
  }

  if (emailVerification) {
    return (
      <EmailAuthentication
        setEmailVerification={setEmailVerification}
        email={email}
        isLoading={false}
      />
    )
  }

  if (smsVerification) {
    return (
      <SMSAuthentication
        setSmsVerification={setSmsVerification}
        phone={phone}
        email={email}
      />
    )
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <div className="flex flex-col items-center mx-5 sm:w-[512px]">
          <h1 className="text-2xl sm:text-[32px] text-primary font-bold text-center">
            Escolha uma forma de autenticação
          </h1>

          <div className="w-full mt-14">
            <Button
              color="secondary"
              className="w-full mt-4"
              type="button"
              isLoading={sendSmsVerification.isPending}
              onClick={() => setEmailVerification(true)}
            >
              Autenticação por e-mail
            </Button>

            <form onSubmit={handleSubmit(handleSendSmsVerification)}>
              <Button
                color="secondary"
                className="w-full mt-4"
                isLoading={sendSmsVerification.isPending}
              >
                Autenticação por SMS
              </Button>
            </form>

            <Button
              color="primary"
              variant="outlined"
              className="flex sm:hidden w-full mt-4"
              onClick={() => router.push('/')}
            >
              Retornar
            </Button>
          </div>

          <div className="sm:w-3/4">
            <div className="flex flex-col gap-6 items-center mt-12 text-center text-xs text-text font-light ">
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
