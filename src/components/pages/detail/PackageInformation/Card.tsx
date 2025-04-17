'use client'

import Button from '@/components/button'
import { formatCurrency } from '@/components/utils/formatCurrency'
import { ItineraryType } from '@/types/itineraryType'
import { WalletMinimal } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

interface CardProps {
  itinerary: ItineraryType | undefined
}

export default function Card({ itinerary }: CardProps) {
  const router = useRouter()
  if (!itinerary) return null

  return (
    <div className="shadow-md bg-white p-5 rounded-lg gap-4 grid grid-cols-1 md:grid-cols-[80%_1fr]">
      <div className="flex flex-col gap-2">
        <span className="text-2xl md:text-[32px] text-primary font-bold">
          {itinerary.name}
        </span>

        <p>
          {`${itinerary.days} Dias de viagem | Disponível em ${itinerary.months.join(', ')}`}
        </p>

        <span className="hidden md:flex">R$ 7.725,00 por pessoa</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-[32px] md:text-[28px] text-primary font-bold">
          {formatCurrency(itinerary.price?.price || 0)}
        </div>

        <Button
          color="secondary"
          className="w-full"
          onClick={() => router.push(`/comprar-pacote/${itinerary.id}`)}
        >
          Contratar Pacote
        </Button>
        <span>
          {formatCurrency(itinerary.price?.price / 2 || 0)} por pessoa
        </span>

        <div className="flex gap-2">
          <WalletMinimal className="min-w-6" size={24} />
          <p className="text-sm">pix, cartão de crédito ou boleto parcelado</p>
        </div>
      </div>
    </div>
  )
}
