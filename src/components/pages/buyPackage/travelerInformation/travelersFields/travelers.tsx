'use client'

import InputErrorMessage from '@/components/pages/inputErrorMessage'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Controller, useFormContext } from 'react-hook-form'
import {
  CreateOrderTypeFields,
  useControlInformationStep,
} from '../../controlInformationStepContext'

const MONTHS = [
  {
    value: '01',
    label: 'Janeiro',
  },
  {
    value: '02',
    label: 'Fevereiro',
  },
  {
    value: '03',
    label: 'Março',
  },
  {
    value: '04',
    label: 'Abril',
  },
  {
    value: '05',
    label: 'Maio',
  },
  {
    value: '06',
    label: 'Junho',
  },
  {
    value: '07',
    label: 'Julho',
  },
  {
    value: '08',
    label: 'Agosto',
  },
  {
    value: '09',
    label: 'Setembro',
  },
  {
    value: '10',
    label: 'Outubro',
  },
  {
    value: '11',
    label: 'Novembro',
  },
  {
    value: '12',
    label: 'Dezembro',
  },
]

interface TravelersProps {
  travelerIndex: number
}

export default function Travelers({ travelerIndex }: TravelersProps) {
  const { isPending } = useControlInformationStep()
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateOrderTypeFields>()

  const watchDocumentType = watch(`travelers.${travelerIndex}.documentType`)

  // Obtém o ano atual
  const currentYear = new Date().getFullYear()

  // Gera um array com os últimos 120 anos
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i)

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3">
        <span className="text-2xl font-bold">Adulto {travelerIndex + 1}</span>
        {travelerIndex === 0 && (
          <span>Essa pessoa será responsável pelo pacote de hospedagem.</span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Nome"
          label="Nome"
          {...register(`travelers.${travelerIndex}.name`, {
            required: 'Campo obrigatório',
            minLength: {
              value: 3,
              message: 'Nome deve ter no mínimo 3 caracteres',
            },
          })}
          errorMessage={
            errors.travelers?.[travelerIndex]?.name && (
              <InputErrorMessage
                error={errors.travelers?.[travelerIndex]?.name?.message}
              />
            )
          }
          isLoading={isPending}
        />

        <Input
          type="text"
          placeholder="Sobrenome"
          label="Sobrenome"
          {...register(`travelers.${travelerIndex}.lastName`, {
            required: 'Campo obrigatório',
            minLength: {
              value: 3,
              message: 'Sobrenome deve ter no mínimo 3 caracteres',
            },
          })}
          isLoading={isPending}
          errorMessage={
            errors.travelers?.[travelerIndex]?.lastName && (
              <InputErrorMessage
                error={errors.travelers?.[travelerIndex]?.lastName?.message}
              />
            )
          }
        />

        <Controller
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          name={`travelers.${travelerIndex}.countryOfResidence`}
          render={({
            field: { onChange, value },
            fieldState: { invalid, error },
          }) => (
            <Select value={value} onValueChange={value => onChange(value)}>
              <SelectTrigger
                label="País de Residência"
                errorMessage={
                  invalid && <InputErrorMessage error={error?.message} />
                }
                isLoading={isPending}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="BRASIL">Brasil</SelectItem>
                  <SelectItem value="ARGENTINA">Argentina</SelectItem>
                  <SelectItem value="CHILE">Chile</SelectItem>
                  <SelectItem value="URUGUAI">Uruguai</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <span className="font-bold">Documentos</span>

        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-3 items-end">
          <Controller
            control={control}
            name={`travelers.${travelerIndex}.documentType`}
            render={({ field: { onChange, value } }) => (
              <Select value={value} onValueChange={value => onChange(value)}>
                <SelectTrigger label="Tipo de Documento" isLoading={isPending}>
                  <SelectValue />
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
              {...register(`travelers.${travelerIndex}.cpf`, {
                required: 'Campo obrigatório',
                minLength: {
                  value: 11,
                  message: 'CPF deve ter no mínimo 11 caracteres',
                },
              })}
              isLoading={isPending}
              errorMessage={
                errors.travelers?.[travelerIndex]?.cpf && (
                  <InputErrorMessage
                    error={errors.travelers?.[travelerIndex]?.cpf?.message}
                  />
                )
              }
            />
          ) : (
            <Input
              type="text"
              placeholder="Número do Documento"
              {...register(`travelers.${travelerIndex}.documentNumber`, {
                required: 'Campo obrigatório',
                minLength: {
                  value: 9,
                  message: 'RG deve ter no mínimo 9 caracteres',
                },
              })}
              isLoading={isPending}
              errorMessage={
                errors.travelers?.[travelerIndex]?.documentNumber && (
                  <InputErrorMessage
                    error={
                      errors.travelers?.[travelerIndex]?.documentNumber?.message
                    }
                  />
                )
              }
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <Controller
            control={control}
            name={`travelers.${travelerIndex}.dayBirth`}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({
              field: { onChange, value },
              fieldState: { invalid, error },
            }) => (
              <Select value={value} onValueChange={value => onChange(value)}>
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
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            control={control}
            name={`travelers.${travelerIndex}.monthBirth`}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({
              field: { onChange, value },
              fieldState: { invalid, error },
            }) => (
              <Select value={value} onValueChange={value => onChange(value)}>
                <SelectTrigger
                  isLoading={isPending}
                  errorMessage={
                    invalid && <InputErrorMessage error={error?.message} />
                  }
                >
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {MONTHS.map(month => (
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
            name={`travelers.${travelerIndex}.yearBirth`}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({
              field: { onChange, value },
              fieldState: { invalid, error },
            }) => (
              <Select value={value} onValueChange={value => onChange(value)}>
                <SelectTrigger
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
                      <SelectItem value={year.toString()}>{year}</SelectItem>
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
          {...register(`travelers.${travelerIndex}.address.street`, {
            required: 'Campo obrigatório',
            minLength: {
              value: 3,
              message: 'Nome da rua deve ter no mínimo 3 caracteres',
            },
          })}
          errorMessage={
            errors.travelers?.[travelerIndex]?.address?.street && (
              <InputErrorMessage
                error={
                  errors.travelers?.[travelerIndex]?.address?.street?.message
                }
              />
            )
          }
          isLoading={isPending}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            type="text"
            placeholder="Nome da Cidade"
            label="Cidade"
            {...register(`travelers.${travelerIndex}.address.city`, {
              required: 'Campo obrigatório',
              minLength: {
                value: 3,
                message: 'Nome da cidade deve ter no mínimo 3 caracteres',
              },
            })}
            errorMessage={
              errors.travelers?.[travelerIndex]?.address?.city && (
                <InputErrorMessage
                  error={
                    errors.travelers?.[travelerIndex]?.address?.city?.message
                  }
                />
              )
            }
            isLoading={isPending}
          />

          <Input
            type="text"
            placeholder="Nome do Estado"
            label="Estado"
            {...register(`travelers.${travelerIndex}.address.state`, {
              required: 'Campo obrigatório',
              minLength: {
                value: 2,
                message: 'Nome do estado deve ter no mínimo 2 caracteres',
              },
            })}
            errorMessage={
              errors.travelers?.[travelerIndex]?.address?.state && (
                <InputErrorMessage
                  error={
                    errors.travelers?.[travelerIndex]?.address?.state?.message
                  }
                />
              )
            }
            isLoading={isPending}
          />

          <Input
            type="text"
            placeholder="CEP da Cidade"
            label="CEP"
            {...register(`travelers.${travelerIndex}.address.zip`, {
              required: 'Campo obrigatório',
              minLength: {
                value: 8,
                message: 'CEP deve ter no mínimo 8 caracteres',
              },
            })}
            errorMessage={
              errors.travelers?.[travelerIndex]?.address?.zip && (
                <InputErrorMessage
                  error={
                    errors.travelers?.[travelerIndex]?.address?.zip?.message
                  }
                />
              )
            }
            isLoading={isPending}
          />

          <Input
            type="text"
            placeholder="Número da Residência"
            label="Número"
            {...register(`travelers.${travelerIndex}.address.number`, {
              required: 'Campo obrigatório',
              minLength: {
                value: 1,
                message: 'Número da residência deve ter no mínimo 1 caracteres',
              },
            })}
            errorMessage={
              errors.travelers?.[travelerIndex]?.address?.number && (
                <InputErrorMessage
                  error={
                    errors.travelers?.[travelerIndex]?.address?.number?.message
                  }
                />
              )
            }
            isLoading={isPending}
          />
        </div>

        <span className="font-bold">Acomodação</span>

        <Controller
          control={control}
          name={`travelers.${travelerIndex}.accommodation`}
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
              required
            >
              <SelectTrigger
                isLoading={isPending}
                errorMessage={
                  invalid && <InputErrorMessage error={error?.message} />
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="SINGLE">Quarto Individual</SelectItem>
                  <SelectItem value="ONE_COUPLE">
                    Quarto para um casal
                  </SelectItem>
                  <SelectItem value="ONE_SINGLE_ONE_COUPLE">
                    Quarto para um casal e um solteiro
                  </SelectItem>
                  <SelectItem value="TWO_SINGLES">
                    Quarto para dois solteiros
                  </SelectItem>
                  <SelectItem value="TWO_COUPLES">
                    Quarto para dois casais
                  </SelectItem>
                  <SelectItem value="TWO_SINGLES_ONE_COUPLE">
                    Quarto para dois solteiros e um casal
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  )
}
