'use client'

import Button from '@/components/button'
import { useControlInformationStep } from './controlInformationStepContext'

export default function BuyPackageHeader() {
  const { currentStep, setCurrentStep } = useControlInformationStep()

  if (currentStep === 5) return null

  return (
    <div className="hidden md:flex items-center mb-10 justify-between">
      <h1 className="text-[32px] font-bold text-primary">Adquirir pacote</h1>

      {currentStep !== 1 && (
        <Button
          variant="outlined"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Retorna
        </Button>
      )}
    </div>
  )
}
