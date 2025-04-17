import { postTokenTwoFactor, putPhoneTwoFactor } from '@/api/two-factor-auth'
import { getUsersInfo } from '@/api/users'
import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useToast } from '@/hooks/use-toast'
import { queryClient } from '@/lib/react-query'
import { SendPhoneTwoFactorType } from '@/types/two-factor-auth/sendPhoneTwoFactorType'
import { SendTokenTwoFactorType } from '@/types/two-factor-auth/sendTokenTwoFactorType'
import { UpdateUserType } from '@/types/updateUserType'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputErrorMessage from '../inputErrorMessage'

export default function SmsCodeCheck() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const userPhone = searchParams.get('phone')

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors: tokenErrors },
  } = useForm<SendTokenTwoFactorType>()

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUsersInfo,
  })

  const sendToken = useMutation({
    mutationFn: (tokenData: SendTokenTwoFactorType) =>
      postTokenTwoFactor(tokenData),
    onSuccess: () => {
      toast({
        title: 'Segurança reforçada!',
        description: 'Verificação de dois fatores ativada com sucesso!',
      })
      router.push('/autenticacao-dois-fatores?authentication-confirmed=true')
    },
    onError: error => {
      toast({
        title: error.message,
        description:
          'Não foi possível enviar o token, tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
  })

  const handleOnSubmit = (data: SendTokenTwoFactorType) => {
    const token = getValues('token')
    if (token.length === 6) {
      sendToken.mutate(data)
    } else {
      toast({
        title: 'Código inválido',
        description: 'O código de verificação deve ter 6 dígitos.',
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
            Passo 3 - Insira o Token
          </span>
          <div className="flex gap-2 mt-2">
            <div className="bg-primary w-14 h-1"></div>
            <div className="bg-primary w-14 h-1"></div>
            <div className="bg-primary w-14 h-1"></div>
          </div>
        </div>

        <div className="mt-4 mb-10 text-center text-sm md:text-base">
          <p>Estamos quase lá! Agora precisamos que insira o token</p>
          <p>
            que enviamos por SMS para o número{' '}
            <span className="text-secondary">{userPhone}</span>
          </p>
          <div className="flex items-center justify-center">
            <p className="text-sm">Esse não é mais seu telefone de contato?</p>
            <ChangePhoneModal
              name={userData?.name}
              phone={userData?.phone}
              receiveOffers={userData?.receiveOffers}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="mb-8">
            <Controller
              name="token"
              control={control}
              defaultValue=""
              rules={{
                required: 'O código de verificação é obrigatório',
                minLength: {
                  value: 6,
                  message: 'O código de verificação deve ter 6 dígitos',
                },
              }}
              render={({ field }) => (
                <InputOTP maxLength={6} {...field}>
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
              )}
            />
            {tokenErrors.token && (
              <InputErrorMessage
                error={
                  typeof tokenErrors.token.message === 'string'
                    ? tokenErrors.token.message
                    : undefined
                }
              />
            )}
          </div>

          <Button
            color="secondary"
            className="w-full"
            disabled={!!tokenErrors.token}
            isLoading={sendToken.isPending}
            type="submit"
          >
            Confirmar Token
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

interface ChangePhoneModalProps {
  name?: string | null
  phone?: string | null
  receiveOffers?: boolean | null
}

function ChangePhoneModal({
  name,
  phone,
  receiveOffers,
}: ChangePhoneModalProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [openChangePhone, setOpenChangePhone] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserType>()

  const changePhoneNumber = useMutation({
    mutationFn: ({ dataPhone }: { dataPhone: UpdateUserType }) =>
      putPhoneTwoFactor(dataPhone),
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
    changePhoneNumber.mutate({ dataPhone: userDataToUpdate })
    setOpenChangePhone(false)
  }

  return (
    <>
      <Button
        className="font-normal p-2"
        variant="text"
        onClick={() => setOpenChangePhone(true)}
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
