import { updateRepresentativeData } from '@/api/representative/personal-data'
import Button from '@/components/button'
import InputErrorMessage from '@/components/pages/inputErrorMessage'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { countries } from '@/components/utils/countries'
import { months } from '@/components/utils/months'
import { years } from '@/components/utils/years'
import { useToast } from '@/hooks/use-toast'
import { RepresentativeUpdateData } from '@/types/representative/personal-data/representativeUpdateDataType'
import { NotePencil } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

type InputFieldEditInformationType = RepresentativeUpdateData & {
  dayBirth: string
  monthBirth: string
  yearBirth: string
  address: RepresentativeUpdateData['address'] & {
    country: string
  }
}

interface EditInformationProps {
  handleStepChange: (step: string) => void
}

export default function EditInformation({
  handleStepChange,
}: EditInformationProps) {
  const { toast } = useToast()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFieldEditInformationType>({
    defaultValues: {
      name: '',
      lastName: '',
      documentType: 'CPF',
      dateBirth: '',
      profession: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        number: '',
      },
      dayBirth: '',
      monthBirth: '',
      yearBirth: '',
    },
  })

  const watchDocumentType = watch('documentType')

  const mutationUpdateRepresentativeData = useMutation({
    mutationFn: updateRepresentativeData,
    onSuccess: () => {
      toast({
        title: 'Dados atualizados com sucesso',
        description: 'Seus dados foram atualizados com sucesso',
        variant: 'green',
      })
      handleStepChange('change-financial')
    },
    onError: error => {
      toast({
        title: 'Erro ao criar pedido',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const { isPending } = mutationUpdateRepresentativeData

  const handleOnSubmit = (data: InputFieldEditInformationType) => {
    const formattedDate: RepresentativeUpdateData = {
      address: {
        city: data.address.city,
        number: data.address.number,
        state: data.address.state,
        street: data.address.street,
        zip: data.address.zip,
      },
      dateBirth: `${data.yearBirth}-${data.monthBirth}-${data.dayBirth}`,
      document: data.document,
      documentType: data.documentType,
      lastName: data.lastName,
      name: data.name,
      profession: data.profession,
    }
    console.log(data)
    mutationUpdateRepresentativeData.mutate(formattedDate)
  }

  return (
    <AccordionItem
      value="change-information"
      className="border-none shadow-md bg-white rounded-lg px-4 md:px-8 md:py-4"
    >
      <AccordionTrigger className="flex justify-between items-center gap-4 text-sm md:text-base">
        <span className="md:text-xl font-bold text-left">Dados Pessoais</span>

        <div className="rounded-full size-[50px] p-2 flex items-center justify-center bg-primary text-white">
          <NotePencil className="w-full h-full" />
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-6" asChild>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="grid grid-cols-[70%_1fr]"
        >
          <div className="mt-4 flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Primeiro nome"
              label="Nome"
              {...register('name', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 3,
                  message: 'Nome deve ter no mínimo 3 caracteres',
                },
              })}
              errorMessage={
                errors.name && (
                  <InputErrorMessage error={errors?.name?.message} />
                )
              }
              isLoading={isPending}
            />

            <Input
              type="text"
              placeholder="Segundo nome"
              label="Sobrenome"
              {...register('lastName', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 3,
                  message: 'Sobrenome deve ter no mínimo 3 caracteres',
                },
              })}
              errorMessage={
                errors.lastName && (
                  <InputErrorMessage error={errors?.lastName?.message} />
                )
              }
              isLoading={isPending}
            />

            <span className="font-bold">Documentos</span>

            <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-3 items-end">
              <Controller
                control={control}
                name="documentType"
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onValueChange={value => onChange(value)}
                  >
                    <SelectTrigger
                      label="Tipo de Documento"
                      isLoading={isPending}
                    >
                      <SelectValue placeholder="CPF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="CPF">CPF</SelectItem>
                        <SelectItem value="RG">RG</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {watchDocumentType === 'CPF' ? (
                <Input
                  type="text"
                  placeholder="Número do Documento"
                  {...register('document', {
                    required: 'Campo obrigatório',
                    minLength: {
                      value: 11,
                      message: 'CPF deve ter no mínimo 11 caracteres',
                    },
                  })}
                  isLoading={isPending}
                  errorMessage={
                    errors.document && (
                      <InputErrorMessage error={errors?.document?.message} />
                    )
                  }
                />
              ) : (
                <Input
                  type="text"
                  placeholder="Número do Documento"
                  {...register('document', {
                    required: 'Campo obrigatório',
                    minLength: {
                      value: 9,
                      message: 'RG deve ter no mínimo 9 caracteres',
                    },
                  })}
                  isLoading={isPending}
                  errorMessage={
                    errors.document && (
                      <InputErrorMessage error={errors.document?.message} />
                    )
                  }
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <Controller
                control={control}
                name="dateBirth"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    value={value}
                    onValueChange={value => onChange(value)}
                  >
                    <SelectTrigger
                      label="Data de Nascimento"
                      isLoading={isPending}
                      errorMessage={
                        invalid && <InputErrorMessage error={error?.message} />
                      }
                    >
                      <SelectValue placeholder="Dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          day => (
                            <SelectItem key={day} value={day.toString()}>
                              {day}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="monthBirth"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    value={value}
                    onValueChange={value => onChange(value)}
                  >
                    <SelectTrigger
                      label="Data de Nascimento"
                      isLoading={isPending}
                      errorMessage={
                        invalid && <InputErrorMessage error={error?.message} />
                      }
                    >
                      <SelectValue placeholder="Mês" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {months.map(month => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="yearBirth"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    value={value}
                    onValueChange={value => onChange(value)}
                  >
                    <SelectTrigger
                      label="Data de Nascimento"
                      isLoading={isPending}
                      errorMessage={
                        invalid && <InputErrorMessage error={error?.message} />
                      }
                    >
                      <SelectValue placeholder="Ano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {years.map(year => (
                          <SelectItem value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Input
              type="text"
              placeholder="Digite aqui"
              label="Profissão/Ocupação"
              {...register('profession', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 3,
                  message: 'Profissão deve ter no mínimo 3 caracteres',
                },
              })}
              isLoading={isPending}
              errorMessage={
                errors.profession && (
                  <InputErrorMessage error={errors?.profession?.message} />
                )
              }
            />

            <span className="font-bold">Endereço</span>
            <Input
              type="text"
              placeholder="Nome da Rua"
              label="Rua"
              {...register('address.street', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 3,
                  message: 'Rua deve ter no mínimo 3 caracteres',
                },
              })}
              isLoading={isPending}
              errorMessage={
                errors.address?.street && (
                  <InputErrorMessage error={errors?.address?.street?.message} />
                )
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="Nome da Cidade"
                label="Cidade"
                {...register('address.city', {
                  required: 'Campo obrigatório',
                  minLength: {
                    value: 3,
                    message: 'Cidade deve ter no mínimo 3 caracteres',
                  },
                })}
                isLoading={isPending}
                errorMessage={
                  errors.address?.city && (
                    <InputErrorMessage error={errors?.address?.city?.message} />
                  )
                }
              />

              <Input
                type="text"
                placeholder="Nome do Estado"
                label="Estado"
                {...register('address.state', {
                  required: 'Campo obrigatório',
                  minLength: {
                    value: 2,
                    message: 'Estado deve ter no mínimo 2 caracteres',
                  },
                })}
                isLoading={isPending}
                errorMessage={
                  errors.address?.state && (
                    <InputErrorMessage
                      error={errors?.address?.state?.message}
                    />
                  )
                }
              />

              <Input
                type="text"
                placeholder="CEP da Cidade"
                label="CEP"
                {...register('address.zip', {
                  required: 'Campo obrigatório',
                  minLength: {
                    value: 8,
                    message: 'CEP deve ter no mínimo 8 caracteres',
                  },
                })}
                isLoading={isPending}
                errorMessage={
                  errors.address?.zip && (
                    <InputErrorMessage error={errors?.address?.zip?.message} />
                  )
                }
              />

              <Input
                type="text"
                placeholder="Número da Residência"
                label="Número"
                {...register('address.number', {
                  required: 'Campo obrigatório',
                  minLength: {
                    value: 1,
                    message: 'Número deve ter no mínimo 1 caracteres',
                  },
                })}
                isLoading={isPending}
                errorMessage={
                  errors.address?.number && (
                    <InputErrorMessage
                      error={errors?.address?.number?.message}
                    />
                  )
                }
              />

              <Controller
                control={control}
                name="address.country"
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onValueChange={value => onChange(value)}
                  >
                    <SelectTrigger
                      label="País de Residência"
                      isLoading={isPending}
                    >
                      <SelectValue placeholder="Selecione o país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {countries.map(country => (
                          <SelectItem value={country.code}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="flex items-end justify-end">
            <Button type="submit" isLoading={isPending}>
              Próximo: Dados Financeiros
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}
