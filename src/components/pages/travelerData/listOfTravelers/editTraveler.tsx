'use client'

import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TravelerType } from '@/types/travelerType'
import { XSquare } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import InputErrorMessage from '../../inputErrorMessage'
import { queryClient } from '@/lib/react-query'
import { useEffect, useState } from 'react'
import { UpdateTravelerType } from '@/types/updateTravelerType'
import { getTraveler, putTraveler } from '@/api/travelers'

interface EditTravelerProps {
  setEditCard: (value: boolean) => void
  id: number
}

type InputFieldsEditTraveler = TravelerType & {
  birthDay: string
  birthMonth: string
  birthYear: string
}

export default function EditTraveler({ id, setEditCard }: EditTravelerProps) {
  const {
    data: travelerData,
    isLoading: travelerIsLoading,
    error,
  } = useQuery({
    queryKey: ['traveler', id],
    queryFn: () => getTraveler(id),
    enabled: !!id,
  })

  const upDateTraveler = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTravelerType }) =>
      putTraveler(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['traveler', id] })
      queryClient.invalidateQueries({ queryKey: ['travelers'] })
      setEditCard(false)
    },
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InputFieldsEditTraveler>({
    defaultValues: {
      name: '',
      lastName: '',
      countryOfResidence: '',
      documentType: '',
      documentNumber: '',
      phone: '',
      email: '',
      address: {
        street: '',
        city: '',
        state: '',
        number: '',
      },
      birthDate: '',
      accommodation: '',
    },
  })

  useEffect(() => {
    const traveler = travelerData?.data
    if (traveler) {
      setValue('name', traveler.name || '')
      setValue('lastName', traveler.lastName || '')
      setValue('countryOfResidence', traveler.countryOfResidence || '')
      setValue('documentType', traveler.documentType || '')
      setValue('documentNumber', traveler.documentNumber || '')
      setValue('phone', traveler.phone || '')
      setValue('email', traveler.email || '')
      setValue('address', {
        street: traveler?.address?.street || '',
        city: traveler?.address?.city || '',
        state: traveler?.address?.state || '',
        number: traveler?.address?.number || '',
        zip: traveler?.address?.zip || '',
        id: traveler?.address?.id || 0,
        createdAt: traveler?.address?.createdAt || '',
        updatedAt: traveler?.address?.updatedAt || '',
      })
      setValue('birthDate', traveler.birthDate || '')
      setValue('accommodation', traveler.accommodation || '')
    }
  }, [travelerData, setValue])

  const handleOnSubmit = (data: InputFieldsEditTraveler) => {
    const formatedData: UpdateTravelerType = {
      name: data.name,
      lastName: data.lastName,
      countryOfResidence: data.countryOfResidence,
      phone: data.phone,
      email: data.email,
    }
    upDateTraveler.mutate({ id, data: formatedData })
  }

  return (
    <div className="flex flex-col gap-5 mt-5 bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center w-full">
        <div className="grid gap-6">
          <span className="text-lg">
            {travelerData?.data.name} {travelerData?.data.lastName}
          </span>
          <span className="text-lg text-primary font-bold w-full">
            Editar viajante
          </span>
        </div>

        <Button
          className="rounded-full size-[25px] md:size-[50px] p-1 md:p-3"
          onClick={() => setEditCard(false)}
          isLoading={travelerIsLoading || upDateTraveler.isPending}
        >
          <XSquare className="w-full h-full" />
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* dados pessoais */}
        <div className="grid gap-2">
          <Input
            type="text"
            placeholder="Nome"
            label="Nome"
            {...register('name', {
              required: 'Este campo é obrigatório',
            })}
            errorMessage={
              errors.name && <InputErrorMessage error={errors.name?.message} />
            }
            isLoading={travelerIsLoading || upDateTraveler.isPending}
          />

          <Input
            type="text"
            placeholder="Sobrenome"
            label="Sobrenome"
            {...register('lastName', {
              required: 'Este campo é obrigatório',
            })}
            errorMessage={
              errors.lastName && (
                <InputErrorMessage error={errors.lastName?.message} />
              )
            }
            isLoading={travelerIsLoading || upDateTraveler.isPending}
          />

          <Controller
            name="countryOfResidence"
            rules={{ required: 'Este campo é obrigatório' }}
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  label="País de Residência"
                  isLoading={travelerIsLoading || upDateTraveler.isPending}
                  errorMessage={
                    invalid && <InputErrorMessage error={error?.message} />
                  }
                >
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="step1">Brasil</SelectItem>
                    <SelectItem value="step2">Argentina</SelectItem>
                    <SelectItem value="step3">Chile</SelectItem>
                    <SelectItem value="step4">Uruguai</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <span className="font-bold">Documentos</span>

          <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-3 items-end">
            <Controller
              name="documentType"
              rules={{ required: 'Este campo é obrigatório' }}
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    label="Tipo de Documento"
                    isLoading={travelerIsLoading || upDateTraveler.isPending}
                    errorMessage={
                      invalid && <InputErrorMessage error={error?.message} />
                    }
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="step1">CPF</SelectItem>
                      <SelectItem value="step2">RG</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              type="text"
              placeholder="Número do Documento"
              {...register('documentNumber', {
                required: 'Este campo é obrigatório',
              })}
              errorMessage={
                errors.documentNumber && (
                  <InputErrorMessage error={errors.documentNumber?.message} />
                )
              }
              isLoading={travelerIsLoading || upDateTraveler.isPending}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <Controller
              name="birthDay"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    label="Data de Nascimento"
                    isLoading={travelerIsLoading || upDateTraveler.isPending}
                    errorMessage={
                      invalid && <InputErrorMessage error={error?.message} />
                    }
                  >
                    <SelectValue placeholder="Dia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.from({ length: 31 }).map((_, index) => (
                        <SelectItem
                          key={index}
                          value={String(index + 1).padStart(2, '0')}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="birthMonth"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    isLoading={travelerIsLoading || upDateTraveler.isPending}
                    errorMessage={
                      invalid && <InputErrorMessage error={error?.message} />
                    }
                  >
                    <SelectValue placeholder="Mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        'Janeiro',
                        'Fevereiro',
                        'Março',
                        'Abril',
                        'Maio',
                        'Junho',
                        'Julho',
                        'Agosto',
                        'Setembro',
                        'Outubro',
                        'Novembro',
                        'Dezembro',
                      ].map((month, index) => (
                        <SelectItem
                          key={index}
                          value={String(index + 1).padStart(2, '0')}
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="birthYear"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    isLoading={travelerIsLoading || upDateTraveler.isPending}
                    errorMessage={
                      invalid && <InputErrorMessage error={error?.message} />
                    }
                  >
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.from({ length: 100 }, (_, index) => (
                        <SelectItem key={index} value={String(2024 - index)}>
                          {String(2024 - index)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <span className="font-bold">Endereço</span>
          <Input
            type="text"
            placeholder="Nome da Rua"
            label="Rua"
            // {...register('street', {
            //   required: 'Este campo é obrigatório',
            // })}
            isLoading={travelerIsLoading || upDateTraveler.isPending}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              type="text"
              placeholder="Nome da Cidade"
              label="Cidade"
              // {...register('city', {
              //   required: 'Este campo é obrigatório',
              // })}
              isLoading={travelerIsLoading || upDateTraveler.isPending}
            />
            <Input
              type="text"
              placeholder="Nome do Estado"
              label="Estado"
              // {...register('state', {
              //   required: 'Este campo é obrigatório',
              // })}
              isLoading={travelerIsLoading || upDateTraveler.isPending}
            />
            <Input
              type="text"
              placeholder="CEP da Cidade"
              label="CEP"
              // {...register('zip', {
              //   required: 'Este campo é obrigatório',
              // })}
              isLoading={travelerIsLoading || upDateTraveler.isPending}
            />
            <Input
              type="text"
              placeholder="Número da Residência"
              label="Número"
              // {...register('number', {
              //   required: 'Este campo é obrigatório',
              // })}
              isLoading={travelerIsLoading || upDateTraveler.isPending}
            />
          </div>

          <span className="font-bold">Acomodação</span>
          <Controller
            name="accommodation"
            rules={{ required: 'Este campo é obrigatório' }}
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  isLoading={travelerIsLoading || upDateTraveler.isPending}
                  errorMessage={
                    invalid && <InputErrorMessage error={error?.message} />
                  }
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="step1">Quarto Duplo (Padrão)</SelectItem>
                    <SelectItem value="step2">
                      Quarto Triplo (Padrão)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* contatos */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="font-bold">Contatos</span>
            <div className="grid gap-2">
              <div className="gird grid-cols-1 max-w-48 mt-1">
                <Input
                  type="text"
                  placeholder="Número de Telefone"
                  {...register('phone', {
                    required: 'Este campo é obrigatório',
                  })}
                  errorMessage={
                    errors.phone && (
                      <InputErrorMessage error={errors.phone?.message} />
                    )
                  }
                  isLoading={travelerIsLoading || upDateTraveler.isPending}
                />
              </div>
              <div className="gird grid-cols-1 max-w-80">
                <Input
                  type="text"
                  placeholder="E-mail"
                  label="E-mail"
                  {...register('email', {
                    required: 'Este campo é obrigatório',
                  })}
                  errorMessage={
                    errors.email && (
                      <InputErrorMessage error={errors.email?.message} />
                    )
                  }
                  isLoading={travelerIsLoading || upDateTraveler.isPending}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="w-full md:w-auto"
              type="submit"
              isLoading={travelerIsLoading || upDateTraveler.isPending}
            >
              Atualizar cadastro
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
