import { updateRepresentativeFinancial } from '@/api/representative/personal-data'
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
import { useBanks } from '@/hooks/use-banks'
import { useToast } from '@/hooks/use-toast'
import { RepresentativeUpdateFinancial } from '@/types/representative/personal-data/representativeUpdateFinancial'
import { NotePencil } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

type InputFieldEditFinancialType = RepresentativeUpdateFinancial & {
  bankSecondaryCode: string
}

export default function EditFinancial() {
  const { toast } = useToast()
  const { banks, isLoading } = useBanks()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFieldEditFinancialType>({
    defaultValues: {
      bankPrimaryAccount: '',
      bankPrimaryAgency: '',
      bankPrimaryCode: '',
      bankSecondaryAccount: '',
      bankSecondaryAgency: '',
      pixPrimaryType: '',
      pixPrimaryValue: '',
      pixSecondaryType: '',
      pixSecondaryValue: '',
      bankSecondaryCode: '',
    },
  })

  const mutationUpdateRepresentativeFinancial = useMutation({
    mutationFn: updateRepresentativeFinancial,
    onSuccess: () => {
      toast({
        title: 'Dados financeiros atualizados com sucesso',
        description: 'Os dados financeiros foram atualizados com sucesso',
        variant: 'green',
      })
    },
    onError: error => {
      toast({
        title: 'Erro ao atualizar dados financeiros',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const { isPending } = mutationUpdateRepresentativeFinancial

  const handleOnSubmit = (data: InputFieldEditFinancialType) => {
    const formattedData: RepresentativeUpdateFinancial = {
      bankPrimaryAccount: data.bankPrimaryAccount,
      bankPrimaryAgency: data.bankPrimaryAgency,
      bankPrimaryCode: data.bankPrimaryCode,
      bankSecondaryAccount: data.bankSecondaryAccount,
      bankSecondaryAgency: data.bankSecondaryAgency,
      pixPrimaryType: data.pixPrimaryType,
      pixPrimaryValue: data.pixPrimaryValue,
      pixSecondaryType: data.pixSecondaryType,
      pixSecondaryValue: data.pixSecondaryValue,
    }
    mutationUpdateRepresentativeFinancial.mutate(formattedData)
  }

  return (
    <AccordionItem
      value="change-financial"
      className="border-none shadow-md bg-white rounded-lg px-4 md:px-8 md:py-4"
    >
      <AccordionTrigger className="flex justify-between items-center gap-4 text-sm md:text-base">
        <span className="md:text-xl font-bold text-left">
          Dados Financeiros
        </span>

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
            <span className="font-bold">Chave Pix</span>

            <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-3 items-end">
              <Controller
                control={control}
                rules={{ required: 'Campo obrigatório' }}
                name="pixPrimaryType"
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid },
                }) => (
                  <Select
                    value={value}
                    onValueChange={value => onChange(value)}
                  >
                    <SelectTrigger
                      label="Principal"
                      isLoading={isPending}
                      errorMessage={
                        invalid && <InputErrorMessage error={error?.message} />
                      }
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="CPF">CPF</SelectItem>
                        <SelectItem value="RG">RG</SelectItem>
                        <SelectItem value="EMAIL">E-mail</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <Input
                type="text"
                placeholder="Digite sua chave"
                {...register('pixPrimaryValue', {
                  required: 'Campo obrigatório',
                })}
                errorMessage={
                  errors.pixPrimaryValue && (
                    <InputErrorMessage
                      error={errors?.pixPrimaryValue?.message}
                    />
                  )
                }
              />

              <Controller
                control={control}
                name="pixSecondaryType"
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    value={value}
                    onValueChange={value => onChange(value)}
                  >
                    <SelectTrigger
                      label="Secundário"
                      isLoading={isPending}
                      errorMessage={
                        invalid && <InputErrorMessage error={error?.message} />
                      }
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="CPF">CPF</SelectItem>
                        <SelectItem value="RG">RG</SelectItem>
                        <SelectItem value="EMAIL">E-mail</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <Input
                type="text"
                placeholder="Digite sua chave"
                {...register('pixSecondaryValue', {
                  required: 'Campo obrigatório',
                })}
                errorMessage={
                  errors.pixSecondaryValue && (
                    <InputErrorMessage
                      error={errors?.pixSecondaryValue?.message}
                    />
                  )
                }
              />
            </div>

            <span className="font-bold">Transferência Bancária</span>

            <div className="grid grid-cols-1 md:grid-cols-[30%_30%_1fr] gap-3 items-end">
              <Controller
                control={control}
                rules={{ required: 'Campo obrigatório' }}
                name="bankPrimaryCode"
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    value={value.toString()}
                    onValueChange={value => onChange(Number(value))}
                  >
                    <SelectTrigger
                      label="Principal"
                      isLoading={isPending || isLoading}
                      errorMessage={
                        invalid && <InputErrorMessage error={error?.message} />
                      }
                    >
                      <SelectValue>
                        {`${value} - ${banks.find(b => b.code === value)?.name}`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {banks.map(bank => (
                          <SelectItem value={bank.code}>
                            {`${bank.code} - ${bank.name}`}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <Input
                type="text"
                placeholder="Número da agência"
                {...register('bankPrimaryAgency', {
                  required: 'Campo obrigatório',
                })}
                errorMessage={
                  errors.bankPrimaryAgency && (
                    <InputErrorMessage
                      error={errors?.bankPrimaryAgency?.message}
                    />
                  )
                }
              />

              <Input
                type="text"
                placeholder="Número da conta corrente"
                {...register('bankPrimaryAccount', {
                  required: 'Campo obrigatório',
                })}
                errorMessage={
                  errors.bankPrimaryAccount && (
                    <InputErrorMessage
                      error={errors?.bankPrimaryAccount?.message}
                    />
                  )
                }
              />

              <Controller
                control={control}
                rules={{ required: 'Campo obrigatório' }}
                name="bankSecondaryCode"
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    value={value.toString()}
                    onValueChange={value => {
                      onChange(Number(value))
                      console.log(value)
                    }}
                  >
                    <SelectTrigger
                      label="Secundário"
                      isLoading={isPending || isLoading}
                      errorMessage={
                        invalid && <InputErrorMessage error={error?.message} />
                      }
                    >
                      <SelectValue>
                        {`${value} - ${banks.find(b => b.code === value)?.name}`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {banks.map(bank => (
                          <SelectItem key={bank.code} value={bank.code}>
                            {`${bank.code} - ${bank.name}`}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <Input
                type="text"
                placeholder="Número da agência"
                {...register('bankSecondaryAgency', {
                  required: 'Campo obrigatório',
                })}
                errorMessage={
                  errors.bankSecondaryAgency && (
                    <InputErrorMessage
                      error={errors?.bankSecondaryAgency?.message}
                    />
                  )
                }
              />
              <Input
                type="text"
                placeholder="Número da conta corrente"
                {...register('bankSecondaryAccount', {
                  required: 'Campo obrigatório',
                })}
                errorMessage={
                  errors.bankSecondaryAccount && (
                    <InputErrorMessage
                      error={errors?.bankSecondaryAccount?.message}
                    />
                  )
                }
              />
            </div>
          </div>

          <div className="flex items-end justify-end">
            <Button type="submit" disabled={isPending} isLoading={isPending}>
              Atualizar cadastro
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}
