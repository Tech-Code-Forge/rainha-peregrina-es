'use client'

import { Accordion } from '@/components/ui/accordion'
import HeaderPagesRepresentative from '../../headerPagesRepresentative'
import EditInformation from './EditInformation'
import EditFinancial from './EditFinancial'
import { useState } from 'react'

export default function RepresentativePersonalData() {
  const [currentStep, setCurrentStep] = useState('')

  const handleStepChange = (step: string) => {
    setCurrentStep(step === currentStep ? '' : step) // Permite abrir/fechar
  }

  return (
    <main className="px-5 md:px-0 pt-10 pb-52 mx-auto max-w-5xl">
      <HeaderPagesRepresentative
        title="Dados pessoais"
        description="Atualize suas informações e saiba como elas são utilizadas."
        hasBackButton
      />

      <Accordion
        type="single"
        collapsible
        className="w-full rounded-lg mt-8 space-y-6"
        value={currentStep}
        onValueChange={handleStepChange}
      >
        <EditInformation handleStepChange={handleStepChange} />

        <EditFinancial />
      </Accordion>
    </main>
  )
}
