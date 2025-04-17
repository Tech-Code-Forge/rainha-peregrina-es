'use client'

import { useLoggedRepresentative } from '@/app/representante/loggedRepresentativeContext'
import Button from '@/components/button'
import InputErrorMessage from '@/components/pages/inputErrorMessage'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { RepresentativeRegisterAuthType } from '@/types/representative/representativeRegisterAuth'
import { ChevronsLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function RepresentativeRegister() {
  const router = useRouter()
  const methods = useForm<RepresentativeRegisterAuthType>({
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      name: '',
      lastName: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        number: '',
      },
    },
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods
  const { handleRepresentativeSignUp } = useLoggedRepresentative()

  const handleOnSubmit = (data: RepresentativeRegisterAuthType) => {
    handleRepresentativeSignUp(data)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] my-5 sm:my-10">
      <div className="flex justify-start w-full mx-5 md:mx-auto max-w-5xl">
        <Button variant="text" size="small" onClick={() => router.back()}>
          <ChevronsLeft size={16} />
          Voltar
        </Button>
      </div>
      <div className="flex flex-col sm:items-center mx-5 sm:w-[512px] my-5 sm:my-10">
        <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
          Crie sua conta
        </h1>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="w-full mt-14 flex flex-col gap-4"
        >
          <p className="text-sm sm:text-center">
            Preencha todos os campos obrigatórios para finalização do cadastro
            de representante.
          </p>
          <Input
            type="text"
            placeholder="Nome*"
            {...register('name', {
              required: 'Campo obrigatório',
            })}
            errorMessage={
              errors.name && <InputErrorMessage error={errors.name.message} />
            }
          />

          <Input
            type="text"
            placeholder="Sobrenome*"
            {...register('lastName', {
              required: 'Campo obrigatório',
            })}
            errorMessage={
              errors.lastName && (
                <InputErrorMessage error={errors.lastName.message} />
              )
            }
          />

          <Input
            type="text"
            placeholder="Celular*"
            {...register('phone', {
              required: 'Campo obrigatório',
            })}
            errorMessage={
              errors.phone && <InputErrorMessage error={errors.phone.message} />
            }
          />

          <Input
            type="email"
            placeholder="E-mail*"
            {...register('email', {
              required: 'Campo obrigatório',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido',
              },
            })}
            errorMessage={
              errors.email && <InputErrorMessage error={errors.email.message} />
            }
          />

          {/* <Input type="text" placeholder="Confirme o e-mail*" /> */}

          <PasswordInput
            placeholder="Digite sua senha*"
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            errorMessage={
              errors.password && (
                <InputErrorMessage error={errors.password.message} />
              )
            }
          />

          {/* <InputPassword placeholder="Confirme sua senha*" /> */}

          <Button color="secondary" className="w-full" type="submit">
            Criar conta
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full"
            onClick={() => router.push('/representante/entrar')}
          >
            Retornar
          </Button>
        </form>

        <div className="flex items-center my-6 w-full gap-4">
          <div className="h-[0.5px] w-full bg-text" />
          <span className="text-text text-sm text-nowrap">
            ou use uma das seguintes opções
          </span>
          <div className="h-[0.5px] w-full bg-text" />
        </div>

        <div className="w-full mt-6">
          <div className="flex items-center justify-center">
            <div className="sm:w-3/4 flex flex-col items-center sm:flex-row gap-4 justify-center">
              <Button
                className="sm:w-full w-1/2 py-1"
                variant="outlined"
                color="primary"
                isRounded={false}
              >
                <Image
                  className="size-8"
                  src="/images/google-logo.png"
                  width={50}
                  height={50}
                  alt="Ícone Google"
                />
              </Button>

              <Button
                className="sm:w-full w-1/2 py-1"
                variant="outlined"
                color="primary"
                isRounded={false}
              >
                <Image
                  className="size-8"
                  src="/images/facebook-logo.png"
                  width={50}
                  height={50}
                  alt="Ícone Facebook"
                />
              </Button>
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
