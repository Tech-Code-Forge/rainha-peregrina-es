'use client'

import { createCreditCard } from '@/api/credit-card'
import Button from '@/components/button'
import InputErrorMessage from '@/components/pages/inputErrorMessage'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { CreateCreditCardType } from '@/types/createCreditCard'
import { CreditCard, XSquare } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'

type CreateCreditCardTypeFields = CreateCreditCardType

export default function AddNewCard() {
  const [createCard, setCreateCard] = useState(false)
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: createCreditCard,
    onSuccess: () => {
      toast({
        title: 'Cartão cadastrado com sucesso!',
        variant: 'green',
      })
      setCreateCard(false)
    },
    onError: error => {
      toast({
        title: 'Erro ao cadastrar cartão',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const { isPending, mutate: createCredit } = mutation

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateCreditCardTypeFields>({
    defaultValues: {
      brand: '',
      expirationDate: '',
      holderName: '',
      number: '',
    },
  })

  const handleOnSubmit: SubmitHandler<CreateCreditCardTypeFields> = data => {
    createCredit(data)
  }

  return (
    <>
      {!createCard ? (
        <div
          className="flex items-center gap-5 text-primary bg-[#F2F2F2] h-[114px] hover:cursor-pointer justify-center rounded-lg border border-dashed border-text"
          onClick={() => setCreateCard(true)}
        >
          <CreditCard size={32} />
          <span className="text-lg font-bold">Cadastre um novo cartão</span>
        </div>
      ) : (
        <div className="flex flex-col gap-5 bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <Image
                src="/images/masterCard-logo.png"
                alt="Credit Card"
                width={50}
                height={50}
                className="w-8"
              />
              <CreditCard size={32} />
              <CreditCard size={32} />
            </div>

            <Button
              className="rounded-full size-[25px] md:size-[50px] p-1 md:p-3"
              onClick={() => setCreateCard(false)}
            >
              <XSquare className="w-full h-full" />
            </Button>
          </div>

          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <span className="text-lg text-primary font-bold mb-4">
              Cadastre um novo cartão
            </span>

            {isPending ? (
              <AddNewCardLoading />
            ) : (
              <div className="space-y-4 mt-4">
                <Input
                  className="md:w-1/2"
                  type="text"
                  label="Nome do titular do cartão*"
                  {...register('holderName', {
                    required: 'Campo obrigatório',
                  })}
                  errorMessage={
                    errors.holderName && (
                      <InputErrorMessage error={errors.holderName.message} />
                    )
                  }
                />

                <Controller
                  control={control}
                  name="number"
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { invalid, error },
                  }) => (
                    <ReactInputMask
                      mask="9999 9999 9999 9999"
                      value={value}
                      onChange={onChange}
                    >
                      <Input
                        className="md:w-1/2"
                        type="text"
                        label="Número do cartão*"
                        icon={<CreditCard size={24} className="text-gray" />}
                        errorMessage={
                          invalid && (
                            <InputErrorMessage error={error?.message} />
                          )
                        }
                      />
                    </ReactInputMask>
                  )}
                />

                <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
                  <Controller
                    control={control}
                    name="expirationDate"
                    rules={{
                      required: 'Campo obrigatório',
                    }}
                    render={({
                      field: { value, onChange },
                      fieldState: { invalid, error },
                    }) => (
                      <ReactInputMask
                        mask="99/99"
                        value={value}
                        onChange={onChange}
                      >
                        <Input
                          className="md:w-1/4"
                          type="text"
                          label="Data de validade*"
                          placeholder="MM/AA"
                          errorMessage={
                            invalid && (
                              <InputErrorMessage error={error?.message} />
                            )
                          }
                        />
                      </ReactInputMask>
                    )}
                  />

                  <Button className="w-full md:w-1/4" type="submit">
                    Salvar
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  )
}

function AddNewCardLoading() {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col gap-2">
        <span>Nome do titular do cartão*</span>
        <Skeleton className="md:w-1/2 h-10" />
      </div>

      <Skeleton className="md:w-1/2 h-10" />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
        <Skeleton className="md:w-1/2 h-10" />

        <Button className="w-full md:w-1/4" disabled>
          Salvar
        </Button>
      </div>
    </div>
  )
}
