import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import { CreateCreditCardType } from '@/types/createCreditCard'
import { CreditCardType } from '@/types/creditCardType'
import { XSquare } from '@phosphor-icons/react'
import { CreditCardIcon } from 'lucide-react'
import Image from 'next/image'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import InputErrorMessage from '../../inputErrorMessage'

type UpdateCreditCardTypeFields = CreateCreditCardType

interface CreditCardEditProps {
  setEditCard: (value: boolean) => void
  creditCard: CreditCardType
}

export default function CreditCardEdit({
  setEditCard,
  creditCard,
}: CreditCardEditProps) {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<UpdateCreditCardTypeFields>({
    defaultValues: {
      brand: creditCard.brand,
      expirationDate: creditCard.expirationDate,
      holderName: creditCard.holderName,
      number: creditCard.number,
    },
  })

  const handleOnSubmit: SubmitHandler<UpdateCreditCardTypeFields> = data => {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-5 mt-5 bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <Image
            src="/images/masterCard-logo.png"
            alt={creditCard.brand}
            width={50}
            height={50}
            className="w-8"
          />
          <CreditCardIcon size={32} />
          <CreditCardIcon size={32} />
        </div>

        <Button
          className="rounded-full size-[25px] md:size-[50px] p-1 md:p-3"
          onClick={() => setEditCard(false)}
        >
          <XSquare className="w-full h-full" />
        </Button>
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <span className="text-lg text-primary font-bold mb-4">
          Editar Cartão
        </span>

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
            classNameSkeleton="md:w-1/2"
            isLoading={false}
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
                  label="Número do cartão*"
                  placeholder="0000 0000 0000 0000"
                  icon={<CreditCardIcon size={24} className="text-gray" />}
                  errorMessage={
                    invalid && <InputErrorMessage error={error?.message} />
                  }
                  classNameSkeleton="md:w-1/2"
                  isLoading={false}
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
                <ReactInputMask mask="99/99" value={value} onChange={onChange}>
                  <Input
                    className="md:w-1/4"
                    type="text"
                    label="Data de validade*"
                    placeholder="__/__"
                    errorMessage={
                      invalid && <InputErrorMessage error={error?.message} />
                    }
                    classNameSkeleton="md:w-1/4"
                    isLoading={false}
                  />
                </ReactInputMask>
              )}
            />

            <Button isLoading={false} className="w-full md:w-1/4" type="submit">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
