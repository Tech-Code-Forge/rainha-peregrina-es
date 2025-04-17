'use client'

import Button from '@/components/button'
import { formatCurrency } from '@/components/utils/formatCurrency'
import { ItineraryType } from '@/types/itineraryType'
import { useParams, useRouter } from 'next/navigation'

interface HeaderProps {
  itinerary: ItineraryType | undefined
}

export default function Header({ itinerary }: HeaderProps) {
  const router = useRouter()
  const params = useParams<{ id: string }>()

  if (!itinerary) return null

  return (
    <aside className="mx-auto px-5 md:px-0 w-full md:max-w-5xl md:-mt-20 blur-none">
      <div className="md:bg-primary md:bg-opacity-75 flex flex-col gap-2 md:gap-4 rounded-lg md:px-10 py-5">
        <div className="flex justify-between items-center text-[32px] font-bold text-primary md:text-white">
          <h1>{itinerary.name}</h1>

          <span className="hidden md:block">
            {formatCurrency(itinerary.price.price || 0)}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <p className="md:text-white md:text-xl">
            {`${itinerary.days} Dias de viagem | Disponível em ${itinerary.months.join(', ')}`}
          </p>

          <div className="md:flex flex-col gap-1 hidden">
            <Button
              color="secondary"
              onClick={() => router.push(`/comprar-pacote/${params.id}`)}
            >
              Contratar Pacote
            </Button>
            <span className="text-white font-light">
              {formatCurrency(itinerary.price.price / 2 || 0)} por pessoa
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
