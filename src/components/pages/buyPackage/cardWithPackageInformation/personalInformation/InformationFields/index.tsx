'use client'

import Button from '@/components/button'
import InputErrorMessage from '@/components/pages/inputErrorMessage'
import { Input } from '@/components/ui/input'
import { WhatsappLogo } from '@phosphor-icons/react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import {
  CreateOrderTypeFields,
  useControlInformationStep,
} from '../../../controlInformationStepContext'
import { useLoggedUser } from '@/app/(site)/loggedUserContext'
import { useEffect } from 'react'

export default function InformationFields() {
  const { setCurrentStep } = useControlInformationStep()
  const { userInfo, userInfoLoading } = useLoggedUser()
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext<CreateOrderTypeFields>()

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (userInfo) {
      const { name, email, phone } = userInfo
      setValue('name', name || '')
      setValue('email', email || '')
      setValue('phone', phone || '')
    }
  }, [userInfo])

  return (
    <div>
      <h2 className="text-text text-2xl md:text-[32px] font-bold mb-5">
        Informações pessoais
      </h2>

      <div className="flex flex-col gap-5">
        <Input
          type="text"
          placeholder="Nome"
          {...register('name', {
            required: 'Campo obrigatório',
            minLength: {
              value: 3,
              message: 'O nome deve ter no mínimo 3 caracteres',
            },
          })}
          errorMessage={
            errors.name && <InputErrorMessage error={errors.name?.message} />
          }
          isLoading={userInfoLoading}
        />

        <Input
          type="text"
          placeholder="E-mail"
          {...register('email', {
            required: 'Este campo é obrigatório',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email inválido',
            },
          })}
          errorMessage={
            errors.email && <InputErrorMessage error={errors.email?.message} />
          }
          isLoading={userInfoLoading}
        />

        <Controller
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /\(\d{2}\)\s\d{4,5}-\d{4}/,
              message: 'Telefone inválido',
            },
          }}
          control={control}
          name="phone"
          render={({ field, fieldState: { invalid, error } }) => (
            <ReactInputMask
              mask="(99) 99999-9999"
              value={field.value}
              onChange={field.onChange}
              type="tel"
            >
              <Input
                type="tel"
                placeholder="Telefone"
                errorMessage={
                  invalid && <InputErrorMessage error={error?.message} />
                }
                isLoading={userInfoLoading}
              />
            </ReactInputMask>
          )}
        />

        <Button
          color="secondary"
          onClick={() => {
            setCurrentStep(2), scrollToTop()
          }}
        >
          Continuar compra pelo site
        </Button>

        <Button color="neutral" variant="outlined">
          <WhatsappLogo size={20} />
          Continuar compra pelo site
        </Button>
      </div>
    </div>
  )
}
