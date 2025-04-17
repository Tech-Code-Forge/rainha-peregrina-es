'use client'

import Button from '@/components/button'
import { formatCurrency } from '@/components/utils/formatCurrency'
import { RepresentativeCatalogType } from '@/types/representative/representativeCatalog'
import { useParams, useRouter } from 'next/navigation'

interface HeaderProps {
  catalog: RepresentativeCatalogType | undefined
}

export default function Header({ catalog }: HeaderProps) {
  const router = useRouter()
  const params = useParams<{ packageId: string }>()

  if (!catalog) return null

  return (
    <aside className="mx-auto px-5 md:px-0 w-full md:max-w-5xl md:-mt-20 blur-none">
      <div className="md:bg-primary md:bg-opacity-75 flex flex-col gap-2 md:gap-4 rounded-lg md:px-10 py-5">
        <div className="flex justify-between items-center text-[32px] font-bold text-primary md:text-white">
          <h1>{catalog.name}</h1>

          <span className="hidden md:block">
            {formatCurrency(catalog.price?.price || 0)}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <p className="md:text-white md:text-xl">
            {`${catalog.days} Dias de viagem | Disponível em ${catalog.months.join(', ')}`}
          </p>

          <div className="md:flex flex-col gap-1 hidden">
            <Button
              color="secondary"
              onClick={() => router.push(`/comprar-pacote/${params.packageId}`)}
              disabled
            >
              Contratar Pacote
            </Button>
            <span className="text-white font-light">
              {formatCurrency(catalog.price?.price / 2 || 0)} por pessoa
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
