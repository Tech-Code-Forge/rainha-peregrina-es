'use client'

import Button from '@/components/button'
import { useFormContext } from 'react-hook-form'
import {
  CreateOrderTypeFields,
  useControlInformationStep,
} from '../../controlInformationStepContext'
import Travelers from './travelers'

export default function TravelersFields() {
  const { setCurrentStep, isPending } = useControlInformationStep()
  const { watch } = useFormContext<CreateOrderTypeFields>()

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const watchNumberPeople = watch('numberPeople')

  return (
    <aside>
      <h2 className="text-text text-2xl md:text-[32px] font-bold mb-5">
        Informações dos viajantes
      </h2>

      <div className="flex flex-col shadow-md rounded-xl bg-white p-3 gap-5">
        {Array.from({ length: Number(watchNumberPeople) }).map(
          (_, travelerIndex) => (
            <Travelers key={travelerIndex} travelerIndex={travelerIndex} />
          ),
        )}

        <Button
          className="mt-3 md:hidden"
          variant="outlined"
          onClick={() => {
            setCurrentStep(1), scrollToTop()
          }}
          disabled={isPending}
        >
          Retornar
        </Button>

        <Button
          className="mt-3"
          color="secondary"
          type="submit"
          disabled={isPending}
          isLoading={isPending}
        >
          Avançar
        </Button>
      </div>
    </aside>
  )
}
