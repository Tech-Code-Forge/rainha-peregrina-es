'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import EmailVerificationLink from './emailVerificationLink'
import ChangePassword from './changePassword'
import CodeCheck from './codeCheck'
import { useForm, FormProvider } from 'react-hook-form'
import { ResetPasswordType } from '@/types/resetPasswordType'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { postResetPassword } from '@/api/reset-passaword'

export type InputFieldsResetPasswordType = ResetPasswordType & {
  confirmPassword: string
}

export default function ResetPassword() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const methods = useForm<InputFieldsResetPasswordType>()
  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const resetPassword = useMutation({
    mutationFn: (data: ResetPasswordType) => postResetPassword(data),
    onSuccess: () => {
      setLoading(false)
      router.push('/login')
    },
    onError: error => {
      setLoading(false)
      toast({
        title: 'Erro ao resetar senha!',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const handleOnSubmit = (data: ResetPasswordType) => {
    setLoading(true)
    resetPassword.mutate(data)
  }

  const searchParams = useSearchParams()
  const changePasswordParam = searchParams.get('change-password')
  const codeCheckParam = searchParams.get('code-check')
  const email = searchParams.get('email') as string

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {!codeCheckParam && !changePasswordParam && (
          <EmailVerificationLink email={email} />
        )}
        {codeCheckParam && <CodeCheck email={email} />}
        {changePasswordParam && <ChangePassword loading={loading} />}
      </form>
    </FormProvider>
  )
}
