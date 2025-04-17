'use client'

import { createOrder } from '@/api/orders'
import { useToast } from '@/hooks/use-toast'
import { CreateOrderType } from '@/types/createOrderType'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { createContext, useContext, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

type ControlInformationStepContextType = {
  currentStep: number
  setCurrentStep: (step: number) => void
  isPending: boolean
}

const ControlInformationStepContext = createContext(
  {} as ControlInformationStepContextType,
)

interface ControlInformationStepProviderProps {
  children: React.ReactNode
}

type TravelerType = CreateOrderType['travelers'][number] & {
  documentType: string
  yearBirth: string
  monthBirth: string
  dayBirth: string
}

export type CreateOrderTypeFields = CreateOrderType & {
  travelers: TravelerType[]
}

export default function ControlInformationStepProvider({
  children,
}: ControlInformationStepProviderProps) {
  const { toast } = useToast()
  const params = useParams<{ packageId: string }>()
  const [currentStep, setCurrentStep] = useState(1)

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const mutationCreateOrder = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      setCurrentStep(3), scrollToTop()
    },
    onError: error => {
      toast({
        title: 'Erro ao criar pedido',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const methods = useForm<CreateOrderTypeFields>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      itineraryId: Number(params.packageId),
      numberPeople: 1,
      travelers: [
        {
          name: '',
          lastName: '',
          countryOfResidence: 'BRASIL',
          cpf: '',
          documentNumber: '',
          address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            number: '',
          },
          birthDate: '',
          accommodation: '',
          documentType: 'CPF',
          yearBirth: '',
          monthBirth: '',
          dayBirth: '',
        },
      ],
    },
  })

  const { handleSubmit, getValues } = methods

  const { isPending } = mutationCreateOrder

  const handleOnSubmit: SubmitHandler<CreateOrderTypeFields> = data => {
    const formattedData: CreateOrderType = {
      ...data,
      numberPeople: Number(data.numberPeople),
      travelers: data.travelers.map((traveler: TravelerType) => ({
        accommodation: traveler.accommodation,
        address: traveler.address,
        countryOfResidence: traveler.countryOfResidence,
        cpf: traveler.cpf,
        documentNumber: traveler.documentNumber,
        lastName: traveler.lastName,
        name: traveler.name,
        birthDate: `${traveler.yearBirth}-${traveler.monthBirth}-${traveler.dayBirth}`,
      })),
    }
    mutationCreateOrder.mutate(formattedData)
  }

  return (
    <ControlInformationStepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isPending,
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>{children}</form>
      </FormProvider>
    </ControlInformationStepContext.Provider>
  )
}

export const useControlInformationStep = () =>
  useContext(ControlInformationStepContext)
