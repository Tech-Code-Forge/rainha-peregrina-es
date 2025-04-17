'use client'

import { Check } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useControlInformationStep } from './controlInformationStepContext'

export default function InformationStep() {
  const { currentStep } = useControlInformationStep()

  if (currentStep === 5) return null

  return (
    <div className="flex justify-between items-center px-[30px]">
      <div className="relative">
        <div
          className={twMerge(
            ' border-primary size-5 flex items-center justify-center rounded-full p-[2px]',
            currentStep === 1 ? 'border' : 'border-2',
          )}
        >
          {currentStep === 1 ? (
            <div className="bg-primary rounded-full size-full" />
          ) : (
            <Check className="text-primary" strokeWidth={3} />
          )}
        </div>

        <div
          className="text-xs md:text-xs font-light flex flex-col items-center absolute
          top-full mt-2 left-1/2 transform -translate-x-1/2"
        >
          <span>Informações</span> <span>Pessoais</span>
        </div>
      </div>

      <div
        className={twMerge(
          'h-[2px] w-full',
          currentStep === 1 ? 'bg-gray' : 'bg-primary',
        )}
      />

      <div className="relative">
        <div
          className={twMerge(
            'size-5 flex items-center justify-center rounded-full p-[2px]',
            currentStep === 2
              ? 'border border-primary'
              : currentStep > 2
                ? 'border-2 border-primary'
                : 'border border-gray',
          )}
        >
          {currentStep === 2 ? (
            <div className="bg-primary rounded-full size-full" />
          ) : currentStep > 2 ? (
            <Check className="text-primary" strokeWidth={3} />
          ) : null}
        </div>

        <div
          className="text-xs md:text-sm font-light flex flex-col items-center absolute
          top-full mt-2 left-1/2 transform -translate-x-1/2"
        >
          <span>Informações</span>{' '}
          <span className="whitespace-nowrap">dos viajantes</span>
        </div>
      </div>
      <div
        className={twMerge(
          'h-[2px] w-full',
          currentStep > 2 ? 'bg-primary' : 'bg-gray',
        )}
      />

      <div className="relative">
        <div
          className={twMerge(
            'size-5 flex items-center justify-center rounded-full p-[2px]',
            currentStep === 3
              ? 'border border-primary'
              : currentStep > 3
                ? 'border-2 border-primary'
                : 'border border-gray',
          )}
        >
          {currentStep === 3 ? (
            <div className="bg-primary rounded-full size-full" />
          ) : currentStep > 3 ? (
            <Check className="text-primary" strokeWidth={3} />
          ) : null}
        </div>

        <div
          className="text-xs md:text-sm font-light flex flex-col items-center absolute
          top-full mt-2 left-1/2 transform -translate-x-1/2"
        >
          <span>Pagamento</span>
        </div>
      </div>
      <div
        className={twMerge(
          'h-[2px] w-full',
          currentStep === 4 ? 'bg-primary' : 'bg-gray',
        )}
      />

      <div className="relative">
        <div
          className={twMerge(
            'size-5 flex items-center justify-center rounded-full p-[2px]',
            currentStep === 4
              ? 'border-2 border-primary'
              : 'border border-gray',
          )}
        >
          {currentStep === 4 ? (
            <div className="bg-primary rounded-full size-full" />
          ) : null}
        </div>

        <div
          className="text-xs md:text-sm font-light flex flex-col items-center absolute
          top-full mt-2 left-1/2 transform -translate-x-1/2"
        >
          <span>Confirmação</span>
        </div>
      </div>
    </div>
  )
}
