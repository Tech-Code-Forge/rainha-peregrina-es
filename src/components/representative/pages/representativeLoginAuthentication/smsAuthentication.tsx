import { putPhoneTwoFactor } from '@/api/two-factor-auth'
import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { toast, useToast } from '@/hooks/use-toast'
import { queryClient } from '@/lib/react-query'
import { SendPhoneTwoFactorType } from '@/types/two-factor-auth/sendPhoneTwoFactorType'
import { UpdateUserType } from '@/types/updateUserType'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SignInTwoFactorType } from '@/types/two-factor-auth/signInTwoFactorType'
import InputErrorMessage from '@/components/pages/inputErrorMessage'
import { representativeSignInSmsTwoFactor } from '@/api/representative/auth'

interface SMSAuthenticationProps {
  setSmsVerification: (value: boolean) => void
  phone: string | null | undefined
  email: string | null | undefined
}

export default function SMSAuthentication({
  setSmsVerification,
  phone,
  email,
}: SMSAuthenticationProps) {
  const {
    handleSubmit,
    control,
    formState: { errors: tokenErrors },
  } = useForm<SignInTwoFactorType>()

  const sendTwoFactorCode = useMutation({
    mutationFn: (dataTwoFactor: SignInTwoFactorType) =>
      representativeSignInSmsTwoFactor(dataTwoFactor),
    onSuccess: () => {
      toast({
        title: 'Token validado com sucesso!',
        description: 'Aguarde enquanto redirecionamos você.',
      })
    },
    onError: error => {
      toast({
        title: 'Erro ao validar token',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const handleOnSubmit = (data: SignInTwoFactorType) => {
    const payload = {
      email: email ?? '',
      code: data.code,
    }
    sendTwoFactorCode.mutate(payload)
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)] text-text">
      <div className="flex flex-col items-center mx-5 sm:max-w-3xl my-10 sm:my-20">
        <h1 className="text-2xl sm:text-[32px] text-primary font-bold text-center">
          Verificação por SMS
        </h1>
        <div className="mt-4 mb-10 text-center text-sm md:text-base">
          <p>Estamos quase lá! Agora precisamos que insira o token</p>
          <p>
            que enviamos por SMS para o número{' '}
            <span className="text-secondary">{phone}</span>
          </p>
          <div className="flex items-center justify-center">
            <p className="text-sm">Esse não é mais seu telefone de contato?</p>
            <ChangePhoneModal name="nome" phone="phone" receiveOffers={true} />
          </div>
        </div>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="mb-8">
            <Controller
              name="code"
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
            {tokenErrors.code && (
              <InputErrorMessage
                error={
                  typeof tokenErrors.code.message === 'string'
                    ? tokenErrors.code.message
                    : undefined
                }
              />
            )}
          </div>

          <Button
            color="secondary"
            className="w-full"
            disabled={!!tokenErrors.code}
            isLoading={sendTwoFactorCode.isPending}
            type="submit"
          >
            Confirmar Token
          </Button>
        </form>
        <span className="my-6 text-xs text-center md:text-sm">
          Enviar SMS de verificação novamente em{' '}
          <span className="text-primary">5 segundos.</span>
        </span>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setSmsVerification(false)}
          className="w-full md:w-auto"
          isLoading={sendTwoFactorCode.isPending}
        >
          Voltar
        </Button>
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
      window.location.reload()
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
