import { postEmailTwoFactor } from '@/api/two-factor-auth'
import Button from '@/components/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { SendEmailTwoFactorType } from '@/types/two-factor-auth/sendEmailTwoFactorType'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface EmailAuthenticationProps {
  setEmailVerification: (value: boolean) => void
  email: string | null | undefined
  isLoading: boolean
}

export default function EmailAuthentication({
  setEmailVerification,
  email,
}: EmailAuthenticationProps) {
  const { toast } = useToast()
  const { handleSubmit, setValue } = useForm<SendEmailTwoFactorType>()

  useEffect(() => {
    setValue('email', email || '')
  }, [email])

  const sendEmailVerification = useMutation({
    mutationFn: (dataEmail: SendEmailTwoFactorType) =>
      postEmailTwoFactor(dataEmail),
    onSuccess: () => {
      setEmailVerification(true)
      toast({
        title: 'E-mail enviado!',
        description: 'E-mail de verificação enviado com sucesso.',
      })
    },
    onError: error => {
      toast({
        title: 'Erro ao enviar e-mail',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const handleOnSubmit = (data: SendEmailTwoFactorType) => {
    if (email) {
      sendEmailVerification.mutate(data)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)] text-text">
      <div className="flex flex-col items-center mx-5 sm:max-w-3xl my-10 sm:my-20">
        <div className="mt-4 mb-10 text-center text-sm md:text-base">
          <div className="flex flex-row items-center gap-1">
            <p>Iremos enviar um e-mail para verificação para o</p>
            {false ? (
              <span>
                <Skeleton className="w-[200px] h-[16px]" />
              </span>
            ) : (
              <span className="text-secondary">{email}</span>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Button
            type="submit"
            className="w-full md:w-auto"
            isLoading={sendEmailVerification.isPending}
          >
            Enviar link de verificação no e-mail
          </Button>
        </form>

        <span className="my-6 text-xs text-center md:text-sm">
          Enviar e-mail de verificação novamente em{' '}
          <span className="text-primary">5 segundos.</span>
        </span>

        <Button
          color="primary"
          variant="outlined"
          onClick={() => setEmailVerification(false)}
          className="w-full md:w-auto"
        >
          Voltar
        </Button>
      </div>
    </main>
  )
}
