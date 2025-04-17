'use client'

import { useEffect, useState } from 'react'
import EmailAuthentication from './emailAuthentication'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SMSAuthentication from './smsAuthentication'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUsersInfo } from '@/api/users'
import { useForm } from 'react-hook-form'
import { SendPhoneTwoFactorType } from '@/types/two-factor-auth/sendPhoneTwoFactorType'
import { postPhoneTwoFactor } from '@/api/two-factor-auth'
import { useToast } from '@/hooks/use-toast'

export default function LoginAuthentication() {
  const [emailVerification, setEmailVerification] = useState(false)
  const [smsVerification, setSmsVerification] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: getUsersInfo,
  })
  const phone = userData?.phone

  const { handleSubmit, setValue: setPhoneValue } =
    useForm<SendPhoneTwoFactorType>({
      defaultValues: { phone: phone || '' },
    })

  useEffect(() => {
    setPhoneValue('phone', phone || '')
  }, [userData])

  const sendSmsVerification = useMutation({
    mutationFn: (dataPhone: SendPhoneTwoFactorType) =>
      postPhoneTwoFactor(dataPhone),
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
    if (phone) {
      sendSmsVerification.mutate(data)
    }
  }

  if (emailVerification) {
    return (
      <EmailAuthentication
        setEmailVerification={setEmailVerification}
        email={userData?.email}
        isLoading={isLoading}
      />
    )
  }

  if (smsVerification) {
    return (
      <SMSAuthentication
        setSmsVerification={setSmsVerification}
        phone={userData?.phone}
        email={userData?.email}
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
