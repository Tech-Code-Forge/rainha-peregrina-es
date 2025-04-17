'use client'

import Button from '@/components/button'
import {
  CalendarDots,
  CurrencyCircleDollar,
  MinusCircle,
  Path,
  PlusCircle,
} from '@phosphor-icons/react'
import TravelInformation from './travelInformation'
import AccessButtons from './accessButtons'
import CommonQuestions from '@/components/commonQuestions'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getOrderById } from '@/api/orders'
import { formatCurrency } from '@/components/utils/formatCurrency'
import { twMerge } from 'tailwind-merge'

const STATUS_TRANSLATION = {
  CREATED: 'Confirmado',
  CANCELED: 'Cancelado',
  PENDING: 'Pendente',
}

export default function DetailTravel() {
  const params = useParams<{ travelId: string }>()

  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const { data: order } = useQuery({
    queryKey: ['order', params.travelId],
    queryFn: () => getOrderById(params.travelId),
    enabled: !!params.travelId,
  })

  console.log(order)

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${order?.itinerary.imageDesktop})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
        }}
        className="blur-sm h-[133px] md:[300px]"
      />
      <div className="mx-auto px-5 md:px-0 w-full md:max-w-5xl mt-5 text-text mb-52">
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-6">
          <h1 className="font-bold text-2xl md:text-[32px] text-primary">
            {order?.itinerary.name}
          </h1>

          <div className="flex justify-end">
            <Button variant="outlined">Imprimir</Button>
          </div>
        </div>

        <div className="text-sm md:text-xl mt-6 relative">
          <p
            className={`transition-max-height duration-500 ease-in-out ${isExpanded ? 'max-h-full' : 'max-h-20 overflow-hidden md:max-h-full'} `}
          >
            {order?.itinerary.details}
          </p>
          {!isExpanded && (
            <div className="md:hidden absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>
        <div className="flex justify-center md:hidden">
          <button
            onClick={handleToggle}
            className="mt-2 flex items-center gap-1 text-primary text-xs font-bold"
          >
            {isExpanded ? (
              <MinusCircle size={16} weight="light" />
            ) : (
              <PlusCircle size={16} weight="light" />
            )}
            {isExpanded ? 'Ler menos' : 'Ler mais ver'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-20 mt-12 md:text-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shadow-md p-1 rounded-full size-10">
              #
            </div>
            <span className="font-light">N° {order?.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shadow-md p-1 rounded-full size-10">
              <CalendarDots size={24} weight="light" />
            </div>
            <span className="font-light">20/07 - 30/07</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shadow-md p-1 rounded-full size-10">
              <CurrencyCircleDollar size={24} weight="light" />
            </div>
            <span className="font-bold">
              {formatCurrency(order?.finalValue || 0)}
            </span>
          </div>

          <div
            className={twMerge(
              'flex items-center gap-3',
              order?.status === 'CREATED'
                ? 'text-green'
                : order?.status === 'CANCELED'
                  ? 'text-red'
                  : 'text-secondary',
            )}
          >
            <div
              className={twMerge(
                'flex items-center justify-center p-1 rounded-full size-10',
                order?.status === 'CREATED'
                  ? 'bg-green'
                  : order?.status === 'CANCELED'
                    ? 'bg-red'
                    : 'bg-secondary',
              )}
            >
              <Path size={24} weight="light" className="text-white" />
            </div>
            <span className="font-bold">
              {STATUS_TRANSLATION[order?.status || 'PENDING']}
            </span>
          </div>
        </div>

        {order && <TravelInformation order={order} />}

        <AccessButtons />

        <CommonQuestions title="Perguntas frequentes" />
      </div>
    </div>
  )
}
