'use client'

import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import PasswordForm from './passwordForm'
import { useLoggedUser } from '@/app/(site)/loggedUserContext'
import InputErrorMessage from '../inputErrorMessage'
import ReactInputMask from 'react-input-mask'
import CreateGoogle from './createGoogle'
import CreateFacebook from './createFacebook'

export type InputFieldsCreateAccount = {
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function CreateAccountSite() {
  const router = useRouter()
  const { handleSignUp } = useLoggedUser()
  const methods = useForm<InputFieldsCreateAccount>()
  const [isPassword, setIsPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods

  const handleOnSubmit = (data: InputFieldsCreateAccount) => {
    if (!data.password) {
      setIsPassword(true)
      return
    }

    handleSignUp({
      email: data.email,
      phone: data.phone,
      password: data.password,
    })
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col items-center mx-5 sm:w-[512px] my-10 sm:my-20">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col items-center mx-5 sm:w-[512px] mt-10 sm:mt-20"
          >
            {isPassword ? (
              <PasswordForm />
            ) : (
              <>
                <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
                  Crie uma conta
                </h1>

                <div className="w-full mt-14 flex flex-col gap-4">
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

                  <Controller
                    rules={{
                      required: 'Este campo é obrigatório',
                      pattern: {
                        value: /\(\d{2}\)\s\d{4,5}-\d{4}/,
                        message: 'Telefone inválido',
                      },
                    }}
                    name="phone"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <ReactInputMask
                        mask="(99) 99999-9999"
                        value={field.value}
                        onChange={field.onChange}
                        type="tel"
                      >
                        <Input
                          className="placeholder:text-center"
                          type="tel"
                          placeholder="Digite seu número de celular com DDD"
                          errorMessage={
                            invalid && (
                              <InputErrorMessage error={error?.message} />
                            )
                          }
                        />
                      </ReactInputMask>
                    )}
                  />

                  <Button color="secondary" className="w-full" type="submit">
                    Continuar
                  </Button>

                  <Button
                    color="primary"
                    variant="outlined"
                    className="flex sm:hidden w-full"
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
                    <CreateGoogle />

                    <CreateFacebook />
                  </div>
                </div>
              </>
            )}
          </form>
        </FormProvider>

        <div className="sm:w-3/4">
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
