'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import Button from '@/components/button'
import { useToast } from '@/hooks/use-toast'
import { SendPhoneTwoFactorType } from '@/types/two-factor-auth/sendPhoneTwoFactorType'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { UpdateUserType } from '@/types/updateUserType'
import InputErrorMessage from '../inputErrorMessage'
import { queryClient } from '@/lib/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { getUsersInfo } from '@/api/users'
import { postPhoneTwoFactor, putPhoneTwoFactor } from '@/api/two-factor-auth'

export default function SmsVerification() {
  const router = useRouter()
  const { toast } = useToast()

  const { handleSubmit: handleSendSMS, setValue } =
    useForm<SendPhoneTwoFactorType>({
      defaultValues: {
        phone: '',
      },
    })

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUsersInfo,
  })

  const phone = userData?.phone

  useEffect(() => {
    setValue('phone', phone ?? '')
  }, [userData])

  const sendPhone = useMutation<
    SendPhoneTwoFactorType,
    Error,
    SendPhoneTwoFactorType
  >({
    mutationFn: dataPhone => postPhoneTwoFactor(dataPhone),
    onSuccess: () => {
      toast({
        title: 'SMS enviado com sucesso!',
        description: 'Verifique seu telefone de contato.',
      })
      router.push(
        `/autenticacao-dois-fatores?sms-code-check=true&phone=${userData?.phone}`,
      )
    },
    onError: error => {
      toast({
        title: error.message,
        description:
          'Não foi possível enviar o SMS, tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
  })

  const handleOnSubmit = (data: SendPhoneTwoFactorType) => {
    if (userData?.phone) {
      sendPhone.mutate(data)
    } else {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar o SMS.',
        variant: 'destructive',
      })
    }
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
            Passo 2 - Verificação de SMS
          </span>
          <div className="flex gap-2 mt-2">
            <div className="bg-primary w-14 h-1"></div>
            <div className="bg-primary w-14 h-1"></div>
            <div className="bg-gray w-14 h-1"></div>
          </div>
        </div>

        <div className="mt-4 mb-10 text-center text-sm md:text-base">
          <p>
            Estamos quase lá! Agora precisamos verificar seu telefone de
            contato.
          </p>
          <div className="flex flex-row items-center gap-1">
            <p>Iremos enviar um SMS de verificação para o número</p>
            {isLoading ? (
              <span>
                <Skeleton className="w-[120px] h-[16px]" />
              </span>
            ) : (
              <span className="text-secondary"> {userData?.phone}</span>
            )}
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm">Esse não é mais seu telefone de contato?</p>
            <ChangePhoneModal
              phone={userData?.phone}
              name={userData?.name}
              receiveOffers={userData?.receiveOffers}
              isLoading={isLoading}
            />
          </div>
        </div>

        <form onSubmit={handleSendSMS(handleOnSubmit)}>
          <Button className="w-full md:w-auto" isLoading={isLoading}>
            Enviar link de verificação de SMS
          </Button>
        </form>

        <span className="mt-6 text-xs text-center md:text-sm">
          Enviar SMS de verificação novamente em{' '}
          <span className="text-primary">5 segundos.</span>
        </span>
      </div>
    </main>
  )
}

interface ChangePhoneModal {
  name?: string | null
  phone?: string | null
  receiveOffers?: boolean | null
  isLoading?: boolean
}

function ChangePhoneModal({
  phone,
  name,
  receiveOffers,
  isLoading,
}: ChangePhoneModal) {
  const router = useRouter()
  const { toast } = useToast()
  const [openChangePhone, setOpenChangePhone] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserType>()

  const changePhoneNumber = useMutation({
    mutationFn: putPhoneTwoFactor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast({
        title: 'Telefone atualizado com sucesso!',
        description: 'Envie o token novamente.',
      })
      router.push('/autenticacao-dois-fatores?sms-verification=true')
    },
  })

  const handleNewPhoneNumber = (data: SendPhoneTwoFactorType) => {
    const userDataToUpdate: UpdateUserType = {
      name: name ?? '',
      phone: data.phone,
      receiveOffers: receiveOffers ?? true,
    }
    changePhoneNumber.mutate(userDataToUpdate)
    setOpenChangePhone(false)
  }

  return (
    <>
      <Button
        className="font-normal p-2"
        variant="text"
        onClick={() => setOpenChangePhone(true)}
        isLoading={isLoading}
      >
        Atualize Aqui
      </Button>

      <Dialog open={openChangePhone} onOpenChange={setOpenChangePhone}>
        <DialogContent className="max-w-xs sm:max-w-2xl" isClose>
          <form onSubmit={handleSubmit(handleNewPhoneNumber)}>
            <div className="p-4 flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-between">
              <div className="flex flex-col text-primary gap-3 flex-1 mb-3 ">
                <span className="text-[28px] md:text-[32px] font-bold ">
                  Alterar Telefone
                </span>
                <Input
                  placeholder={phone || 'Número de Telefone'}
                  {...register('phone', {
                    required: 'Este campo é obrigatório',
                  })}
                  errorMessage={
                    errors.phone && (
                      <InputErrorMessage error={errors.phone?.message} />
                    )
                  }
                />
              </div>

              <div className="space-y-3 w-full flex-1">
                <Button className="w-full" color="secondary">
                  OK
                </Button>
                <Button
                  onClick={() => setOpenChangePhone(false)}
                  variant="outlined"
                  className="w-full"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
