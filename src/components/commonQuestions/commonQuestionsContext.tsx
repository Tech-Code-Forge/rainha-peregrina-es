'use client'

import { createContext, useContext, useState } from 'react'

const CURRENT_STEP_TRANSLATION = {
  ATTENTION_AND_SAFETY: 'Atenção e segurança',
  BOOKING_DETAILS: 'Detalhes da reserva',
  COMMUNICATION: 'Comunicação',
  CANCELLATIONS: 'Cancelamentos',
  CREDIT_CARD: 'Cartões de crédito',
  EXTRA_AMENITIES: 'Comodidades extras',
  FARE: 'Tarifa',
  PAYMENTS: 'Pagamentos',
  PROPERTY_POLICIES: 'Políticas da propriedade',
  ROOM_TYPES: 'Tipos de quarto',
}

export const QUESTION: CurrentStepType[] = [
  'CANCELLATIONS',
  'PAYMENTS',
  'BOOKING_DETAILS',
  'COMMUNICATION',
  'ROOM_TYPES',
  'FARE',
  'CREDIT_CARD',
  'PROPERTY_POLICIES',
  'EXTRA_AMENITIES',
  'ATTENTION_AND_SAFETY',
]

type CurrentStepType =
  | 'ATTENTION_AND_SAFETY'
  | 'BOOKING_DETAILS'
  | 'COMMUNICATION'
  | 'CANCELLATIONS'
  | 'CREDIT_CARD'
  | 'EXTRA_AMENITIES'
  | 'FARE'
  | 'PAYMENTS'
  | 'PROPERTY_POLICIES'
  | 'ROOM_TYPES'

type ControlCommonQuestionContextType = {
  currentStep: CurrentStepType
  setCurrentStep: (step: CurrentStepType) => void
  QUESTION: CurrentStepType[]
  CURRENT_STEP_TRANSLATION: Record<CurrentStepType, string>
}

const ControlCommonQuestionContext = createContext(
  {} as ControlCommonQuestionContextType,
)

interface ControlCommonQuestionProviderProps {
  children: React.ReactNode
}

export default function ControlCommonQuestionProvider({
  children,
}: ControlCommonQuestionProviderProps) {
  const [currentStep, setCurrentStep] =
    useState<CurrentStepType>('CANCELLATIONS')

  return (
    <ControlCommonQuestionContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        QUESTION,
        CURRENT_STEP_TRANSLATION,
      }}
    >
      {children}
    </ControlCommonQuestionContext.Provider>
  )
}

export const useControlCommonQuestion = () =>
  useContext(ControlCommonQuestionContext)
