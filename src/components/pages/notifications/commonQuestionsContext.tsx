'use client'

import { createContext, useContext, useState } from 'react'

const CURRENT_STEP_TRANSLATION = {
  PROMOTIONS_AND_OFFERS: 'Promoções e ofertas',
  PRODUCTS_AND_SERVICES: 'Produtos e serviços',
  TRAVEL_EXPERIENCES: 'Experiências de viagem',
}

export const QUESTION: CurrentStepType[] = [
  'PROMOTIONS_AND_OFFERS',
  'PRODUCTS_AND_SERVICES',
  'TRAVEL_EXPERIENCES',
]

type CurrentStepType =
  | 'PROMOTIONS_AND_OFFERS'
  | 'PRODUCTS_AND_SERVICES'
  | 'TRAVEL_EXPERIENCES'

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
  const [currentStep, setCurrentStep] = useState<CurrentStepType>(
    'PROMOTIONS_AND_OFFERS',
  )

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
