'use client'

import { useLoggedUser } from '@/app/(site)/loggedUserContext'
import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import InputErrorMessage from '../inputErrorMessage'
import EnterPassword from './EnterPassword'
import LoginGoogle from './loginGoogle'
import LoginFacebook from './loginFacebook'

export type InputFieldsSignInType = {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const { handleLogin } = useLoggedUser()
  const methods = useForm<InputFieldsSignInType>()
  const [isPassword, setIsPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const handleOnSubmit = (data: InputFieldsSignInType) => {
    if (!data.password) {
      setIsPassword(true)
      return
    }
    handleLogin({ email: data.email, password: data.password })
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col items-center mx-5 sm:w-[512px]"
          >
            {isPassword ? (
              <EnterPassword />
            ) : (
              <>
                <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
                  Faça o login ou crie uma conta
                </h1>

                <div className="w-full mt-14">
                  <Input
                    className="placeholder:text-center"
                    type="email"
                    placeholder="Digite seu e-mail"
                    {...register('email', {
                      required: 'Este campo é obrigatório',
                    })}
                    errorMessage={
                      errors.email && (
                        <InputErrorMessage error={errors.email.message} />
                      )
                    }
                  />

                  <Button
                    color="secondary"
                    className="w-full mt-4"
                    type="submit"
                  >
                    Continuar
                  </Button>

                  <Button
                    color="primary"
                    variant="outlined"
                    className="flex sm:hidden w-full mt-4"
                    onClick={() => router.push('/')}
                  >
                    Retornar
                  </Button>
                </div>

                <div className="flex items-center my-6 w-full gap-4">
                  <div className="h-[0.5px] w-full bg-text" />
                  <span className="text-text text-sm text-nowrap">
                    ou use uma das seguintes opções
                  </span>
                  <div className="h-[0.5px] w-full bg-text" />
                </div>

                <div className="sm:w-3/4">
                  <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
                    <LoginGoogle />
                    <LoginFacebook />
                  </div>

                  <div className="flex flex-col gap-6 items-center mt-12 text-center text-xs text-text font-light ">
                    <div className="w-full h-[1px] bg-gray" />

                    <div>
                      <p>
                        Ao fazer login ou criar uma conta, você concorda com
                        nossos
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
                      <p>
                        Direitos autorais (2024) - Rainha das Peregrinações®
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </FormProvider>
      </div>
    </main>
  )
}
