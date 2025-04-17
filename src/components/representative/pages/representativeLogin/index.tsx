'use client'

import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import RepresentativeCodeCheck from './representativeCodeCheck'
import { ChevronsLeft } from 'lucide-react'
import { useLoggedRepresentative } from '@/app/representante/loggedRepresentativeContext'
import { useForm } from 'react-hook-form'
import InputErrorMessage from '@/components/pages/inputErrorMessage'

type InputFieldsRepresentativeLogin = {
  email: string
  password: string
}

export default function RepresentativeLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InputFieldsRepresentativeLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleRepresentativeLogin } = useLoggedRepresentative()

  const codeCheckParam = searchParams.get('representative-code-check')

  const handleOnSubmit = (data: InputFieldsRepresentativeLogin) => {
    handleRepresentativeLogin({
      email: data.email,
      password: data.password,
    })
  }

  if (codeCheckParam) {
    return <RepresentativeCodeCheck />
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] my-5 sm:my-10">
      <div className="flex justify-start w-full mx-5 md:mx-auto max-w-5xl">
        <Button variant="text" size="small" onClick={() => router.back()}>
          <ChevronsLeft size={16} />
          Voltar
        </Button>
      </div>
      <div className="flex flex-col items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
          Faça o login
        </h1>

        <span className="mt-4 text-sm">
          Acesse sua conta informando o e-mail e a senha cadastrada.
        </span>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="w-full mt-14 flex flex-col gap-4"
        >
          <Input
            className="placeholder:text-center"
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email', {
              required: 'Este campo é obrigatório',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido',
              },
            })}
            errorMessage={
              errors.email && (
                <InputErrorMessage error={errors.email?.message} />
              )
            }
          />

          <Input
            className="placeholder:text-center"
            placeholder="Insira sua senha"
            type="password"
            {...register('password', {
              required: 'Este campo é obrigatório',
            })}
            errorMessage={
              errors.password && (
                <InputErrorMessage error={errors.password?.message} />
              )
            }
          />

          <Button color="secondary" className="w-full mt-4" type="submit">
            Acessar conta
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="flex sm:hidden w-full mt-4"
            onClick={() => router.push('/representante/entrar')}
          >
            Retornar
          </Button>

          <div className="text-sm flex gap-1 justify-center">
            <p>Esqueceu sua senha?</p>
            <Link
              href="/representante/recuperar-senha"
              className="text-primary hover:underline"
            >
              Recupere agora
            </Link>
          </div>
        </form>

        <div className="flex items-center my-6 w-full gap-4">
          <div className="h-[0.5px] w-full bg-text" />
          <span className="text-text text-sm text-nowrap">
            ou use uma das seguintes opções
          </span>
          <div className="h-[0.5px] w-full bg-text" />
        </div>

        <div className="sm:w-3/4">
          <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
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
